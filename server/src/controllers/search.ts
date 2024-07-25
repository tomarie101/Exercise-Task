// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import express from "express";

// const router = express.Router();
// const prisma = new PrismaClient();

// const isValidDate = (dateString: string) => {
//   const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
//   return dateString.match(regex) !== null;
// };

// export const searchArticles = async (req: Request, res: Response) => {
//   const { query } = req.query;
//   console.log("Received request to search articles:", query);

//   if (!query || typeof query !== "string") {
//     return res
//       .status(400)
//       .json({ error: "Query is required and must be a string" });
//   }

//   const lowerCaseQuery = query.toLowerCase();

//   try {
//     const articles = await prisma.article.findMany({
//       where: {
//         OR: [
//           { title: { contains: lowerCaseQuery } },
//           {
//             author: {
//               userName: { contains: lowerCaseQuery },
//             },
//           },
//           isValidDate(lowerCaseQuery)
//             ? {
//                 AND: [
//                   { createdAt: { gte: new Date(lowerCaseQuery) } },
//                   { createdAt: { lte: new Date(lowerCaseQuery) } },
//                 ],
//               }
//             : {},
//         ],
//       },
//       include: {
//         author: true,
//       },
//     });

//     res.json(articles);
//   } catch (error) {
//     console.error("Error searching articles:", error);
//     res.status(500).json({ error: "Failed to search articles" });
//   }
// };

// export default router;
