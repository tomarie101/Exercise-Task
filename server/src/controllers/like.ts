// import e, { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import express from "express";

// const prisma = new PrismaClient();
// const router = express.Router();

// //add like/dislike,Update
// export const addReactions = async (req: Request, res: Response) => {
//   const articleId = parseInt(req.params.id);
//   const { type, userId } = req.body;

//   try {
//     const reactions = await prisma.reaction.findFirst({
//       //check if the user has already reacted to the article
//       where: {
//         articleId,
//         userId,
//       },
//     });
//     let reaction;

//     if (reactions) {
//       //update the reaction
//       reaction = await prisma.reaction.update({
//         where: {
//           id: reactions.id,
//         },
//         data: {
//           type,
//         },
//       });
//     } else {
//       //create a new reaction
//       reaction = await prisma.reaction.create({
//         data: {
//           type,
//           userId,
//           articleId,
//         },
//       });
//     }
//     res.json(reaction);
//   } catch (error) {
//     console.error(error);
//     res.json({ error: "Failed to add reaction" });
//   }
// };

// //Remove reaction
// export const deleteReactions = async (req: Request, res: Response) => {
//   const articleId = parseInt(req.params.id);
//   const { userId } = req.body;

//   try {
//     await prisma.reaction.deleteMany({
//       where: {
//         articleId,
//         userId,
//       },
//     });
//     res.json({ message: "Reaction deleted" });
//   } catch (error) {
//     console.error(error);
//     res.json({ error: "Failed to delete reaction" });
//   }
// };

// // get all reactions
// export const getReactions = async (req: Request, res: Response) => {
//   const articleId = parseInt(req.params.id);

//   try {
//     const reactions = await prisma.reaction.findMany({
//       where: {
//         articleId,
//       },
//     });
//     res.json(reactions);
//   } catch (error) {
//     console.error(error);
//     res.json({ error: "Failed to fetch reactions" });
//   }
// };

// export default router;

// codingfleet;
// /////////////////////////////////////////
// const express = require("express");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// const app = express();
// app.use(express.json());

// /**
//  * Endpoint to vote on an article.
//  *
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  */
// app.post("/vote", async (req, res) => {
//   const { userId, articleId, type } = req.body;
//   try {
//     // Validate the vote type
//     if (type !== "up" && type !== "down") {
//       return res
//         .status(400)
//         .json({ error: 'Invalid vote type. Must be "up" or "down".' });
//     }

//     // Upsert the reaction in the database
//     const reaction = await prisma.reaction.upsert({
//       where: {
//         userId_articleId: {
//           userId,
//           articleId,
//         },
//       },
//       update: {
//         type,
//       },
//       create: {
//         userId,
//         articleId,
//         type,
//       },
//     });
//     res.json(reaction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * Endpoint to search articles.
//  *
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  */
// app.get("/search", async (req, res) => {
//   const { title, authorName, datePosted } = req.query;
//   try {
//     // Build the search query based on the provided parameters
//     const where = {};
//     if (title) {
//       where.title = {
//         contains: title,
//       };
//     }
//     if (authorName) {
//       where.author = {
//         userName: {
//           contains: authorName,
//         },
//       };
//     }
//     if (datePosted) {
//       where.createdAt = {
//         gte: new Date(datePosted),
//       };
//     }

//     // Fetch the articles based on the search query
//     const articles = await prisma.article.findMany({
//       where,
//       include: {
//         author: true,
//       },
//     });
//     res.json(articles);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
