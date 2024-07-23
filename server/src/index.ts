import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import articleRoutes from "./routes/article";
import likeRoutes from "./routes/like";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true, // Allow cookies to be sent and received
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/articles", articleRoutes); // Use article routes
app.use("/api/reaction", likeRoutes); // Use like routes

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
