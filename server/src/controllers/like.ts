import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

//add like/dislike,Update
export const addReactions = async (req: Request, res: Response) => {
  const articleId = parseInt(req.params.id);
  const { type, userId } = req.body;

  try {
    const reactions = await prisma.reaction.findFirst({
      //check if the user has already reacted to the article
      where: {
        articleId,
        userId,
      },
    });
    let reaction;

    if (reactions) {
      //update the reaction
      reaction = await prisma.reaction.update({
        where: {
          id: reactions.id,
        },
        data: {
          type,
        },
      });
    } else {
      //create a new reaction
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
    res.json({ error: "Failed to add reaction" });
  }
};

//Remove reaction
export const deleteReactions = async (req: Request, res: Response) => {
  const articleId = parseInt(req.params.id);
  const { userId } = req.body;

  try {
    await prisma.reaction.deleteMany({
      where: {
        articleId,
        userId,
      },
    });
    res.json({ message: "Reaction deleted" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to delete reaction" });
  }
};

// get all reactions
export const getReactions = async (req: Request, res: Response) => {
  const articleId = parseInt(req.params.id);

  try {
    const reactions = await prisma.reaction.findMany({
      where: {
        articleId,
      },
    });
    res.json(reactions);
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to fetch reactions" });
  }
};

export default router;
