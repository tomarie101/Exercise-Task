import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.json({ error: "Internal Server Error" });
  }
});

// Get one article by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!article) {
      return res.json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    res.json({ error: "Internal Server Error" });
  }
});

// Create an article
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.json({
      error: "Missing required fields: title, content, author",
    });
  }

  try {
    const article = await prisma.article.create({
      data: { title, content, author },
    });
    return res.json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return res.json({ error: "Internal Server Error" });
  }
});

// Update an article by ID
router.put("/:id", async (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { title, content, author },
    });
    res.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    console.error(`Error updating article ${articleId}:`, error);
    res.json({ error: "Internal Server Error" });
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
    res.json({ error: "Internal Server Error" });
  }
});

export default router;
