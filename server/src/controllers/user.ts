import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// create a new user
export const createUser = async (req: Request, res: Response) => {
  const { email, userName, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        userName,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// get user by id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};

// edit user by id
export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, userName } = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: email,
      userName: userName,
    },
  });
  res.json(user);
};

// delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};

export default router;
