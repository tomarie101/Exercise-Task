import { Router } from "express";
import { getUsers, editUser, deleteUser, getUser } from "../controllers/user";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
