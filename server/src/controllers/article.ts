import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

// Create article
export const createArticle = async (req: Request, res: Response) => {
  const { title, content, thumbnail, authorId } = req.body;

  if (!title || !content || !thumbnail || !authorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        thumbnail,
        authorId,
      },
    });
    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create article" });
  }
};

// Get article by id
export const getArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch article" });
  }
};

// Get all articles
export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch articles" });
  }
};

// Update article by id
export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, thumbnail } = req.body;

  try {
    const article = await prisma.article.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        thumbnail,
      },
    });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: "Failed to update article" });
  }
};

// Delete article by id
export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete article" });
  }
};

export default router;
