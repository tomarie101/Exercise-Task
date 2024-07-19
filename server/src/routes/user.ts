import { Router } from "express";
import { getUsers, editUser, deleteUser } from "../controllers/user";

const router = Router();

router.get("/", getUsers);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
