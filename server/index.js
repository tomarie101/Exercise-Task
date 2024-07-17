import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/User.js";
import articleRouter from "./routes/Article.js";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
// app.use("/api/:articleId", voteRouter);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "test@example.com" && password === "password") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
