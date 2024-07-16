// import { Router } from "express";
// import { PrismaClient } from "@prisma/client";

// const router = Router();

// const prisma = new PrismaClient();

// app.post("/vote", async (req, res) => {
//   const { articleId } = req.params;
//   const { userId, like } = req.body;

//   try {
//     // Fetch the article
//     const article = await prisma.article.findUnique({
//       where: { id: Number(articleId) },
//     });

//     if (!article) {
//       return res.status(404).json({ error: "Article not found" });
//     }

//     // Handle the voting logic
//     if (like) {
//       await prisma.article.update({
//         where: { id: Number(articleId) },
//         data: { likesCount: { increment: 1 } },
//       });
//     } else {
//       await prisma.article.update({
//         where: { id: Number(articleId) },
//         data: { dislikesCount: { increment: 1 } },
//       });
//     }

//     res.status(200).json({ message: "Vote recorded successfully" });
//   } catch (error) {
//     console.error("Failed to record vote", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
