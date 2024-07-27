import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Utility function to validate and parse date
const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date : null;
};

// Utility function to check if the query is a valid date
const isValidDateQuery = (query: string) => {
  return !isNaN(Date.parse(query));
};

export const searchArticles = async (req: Request, res: Response) => {
  const { query } = req.query; // Single query parameter

  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Query parameter is required and must be a string" });
  }

  try {
    const where: any = {};

    // Determine if the query is a date or a text search
    if (isValidDateQuery(query)) {
      const startDate = parseDate(query);
      if (startDate) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1); // End of the day

        where.createdAt = { gte: startDate, lt: endDate };
      }
    } else {
      // Handle title and author searches
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        {
          author: {
            userName: { contains: query, mode: "insensitive" },
          },
        },
      ];
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
