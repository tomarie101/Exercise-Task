import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();
//Register
export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, userName, password, confirmPassword } = req.body;
  if (!email || !userName || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email, username and password" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      userName: userName,
      password: await bcrypt.hash(password, 10),
    },
  });
  res.json({ data: user, message: "User created successfully" });
};

//Login
export const login = async (req: Request, res: Response) => {
  console.log({ message: "Login successful" });
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide the correct email and password" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
};

export default router;
