import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//  Endpoint to search articles based on title, author name, and date posted.

export const searchArticles = async (req: Request, res: Response) => {
  const { title, authorName, datePosted } = req.query;

  try {
    const where: any = {};
    if (title) where.title = { contains: title as string };
    if (authorName)
      where.author = { userName: { contains: authorName as string } };
    if (datePosted) {
      const date = new Date(datePosted as string);
      if (isNaN(date.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid date format for datePosted." });
      }
      where.createdAt = { gte: date };
    }

    const articles = await prisma.article.findMany({
      where,
      include: { author: true },
    });
    res.json(articles);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export default router;
