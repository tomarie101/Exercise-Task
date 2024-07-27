import e, { Request, Response } from "express";
import { PrismaClient, ReactionType } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

export const addReactions = async (req: Request, res: Response) => {
  const articleId = parseInt(req.params.id, 10);
  const { type, userId }: { type: ReactionType; userId: number } = req.body;

  // Validate the reaction type
  if (!Object.values(ReactionType).includes(type)) {
    return res
      .status(400)
      .json({ error: 'Invalid reaction type. Must be "LIKE" or "DISLIKE".' });
  }

  try {
    // Check if the user has already reacted to the article
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        articleId,
        userId,
      },
    });

    let reaction;

    if (existingReaction) {
      // Update the existing reaction
      reaction = await prisma.reaction.update({
        where: {
          id: existingReaction.id,
        },
        data: {
          type,
        },
      });
    } else {
      // Create a new reaction
      reaction = await prisma.reaction.create({
        data: {
          type,
          userId,
          articleId,
        },
      });
    }
    res.json(reaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add reaction" });
  }
};
