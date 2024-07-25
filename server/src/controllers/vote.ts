import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint to vote on an article. Each user can vote (up/down) on articles.

export const createVotes = async (req: Request, res: Response) => {
  const { userId, articleId, type } = req.body;

  // Validate input
  if (!userId || !articleId || !type) {
    return res
      .status(400)
      .json({ error: "Missing userId, articleId, or type in request body." });
  }
  if (type !== "up" && type !== "down") {
    return res
      .status(400)
      .json({ error: 'Invalid vote type. Must be "up" or "down".' });
  }

  try {
    // Check if the article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({ error: "Article not found." });
    }

    // Check if the user is voting on their own article
    if (article.authorId === userId) {
      return res
        .status(400)
        .json({ error: "Users cannot vote on their own articles." });
    }

    const reaction = await prisma.reaction.upsert({
      where: { userId_articleId: { userId, articleId } },
      update: { type },
      create: { userId, articleId, type },
    });
    res.json(reaction);
  } catch (error) {
    console.error("Error in vote:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export default router;
