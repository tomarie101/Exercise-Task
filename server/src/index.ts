import express from "express";
import { Router } from "express";
import cors from "cors";
import login from "./routes/auth";
import register from "./routes/auth";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const route: Router = Router();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", login);
app.use("/api/auth", register);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
