import { Router } from "express";
import {
  createUser,
  getUsers,
  editUser,
  deleteUser,
  getUser,
} from "../controllers/user";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
