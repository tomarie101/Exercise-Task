import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user"; // Assuming you have a separate file for user routes

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

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
