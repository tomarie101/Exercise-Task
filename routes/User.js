import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

//get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

//get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) {
    return res.json({ message: "user not found" });
  }

  return res.json(user);
});
//create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name: name, email: email },
  });
  return res.json({ msg: "Successfully added" });
});

//edit user
router.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name: name, email: email },
  });
  console.log(updatedUser);
  res.json(updatedUser);
});

//delete user
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const deleteUser = await prisma.user.delete({
    where: { id: userId },
  });
  console.log(deleteUser);
  res.json(deleteUser);
});

export default router;
