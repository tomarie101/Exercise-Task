import { Router } from "express";
import {
  addReactions,
  deleteReactions,
  getReactions,
} from "../controllers/like";

const router = Router();

router.post("/:id", addReactions);
router.delete("/:id", deleteReactions);
router.get("/:id", getReactions);

export default router;
