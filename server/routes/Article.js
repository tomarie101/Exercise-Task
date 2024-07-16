import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: { likes: true, author: true },
    });
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get one article by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { likes: true, author: true },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new article
router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Error creating article" });
  }
});

// Update an article by ID
router.put("/:id", async (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { title, content },
    });
    res.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    console.error(`Error updating article ${articleId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an article by ID
router.delete("/:id", async (req, res) => {
  const articleId = parseInt(req.params.id);

  try {
    const deletedArticle = await prisma.article.delete({
      where: { id: articleId },
    });
    res.json({
      message: "Article deleted successfully",
      article: deletedArticle,
    });
  } catch (error) {
    console.error(`Error deleting article ${articleId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search articles by title, author name, and date posted
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { author: { name: { contains: query } } },
          {
            createdAt: {
              gte: new Date(query.toString()), // Adjust this based on your date format
            },
          },
        ],
      },
      include: { author: true, likes: true },
    });
    res.json(articles);
  } catch (error) {
    console.error("Error searching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Vote on an article (thumbs up or thumbs down)
router.post("/:id/vote", async (req, res) => {
  const articleId = parseInt(req.params.id);
  const { userId, isLiked } = req.body;

  if (!userId || isLiked === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required fields: userId, isLiked" });
  }

  try {
    const existingVote = await prisma.like.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });

    let vote;
    if (existingVote) {
      vote = await prisma.like.update({
        where: { id: existingVote.id },
        data: { isLiked },
      });
    } else {
      vote = await prisma.like.create({
        data: { userId, articleId, isLiked },
      });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { likes: true },
    });

    const likesCount =
      article?.likes.filter((like) => like.isLiked).length || 0;
    const dislikesCount =
      article?.likes.filter((like) => !like.isLiked).length || 0;

    await prisma.article.update({
      where: { id: articleId },
      data: { likesCount, dislikesCount },
    });

    res.json({
      message: `Vote registered successfully`,
      vote,
    });
  } catch (error) {
    console.error(`Error voting on article ${articleId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
