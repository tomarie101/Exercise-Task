import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/User.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(3001, () => {
  console.log("Running on port 3001");
});
