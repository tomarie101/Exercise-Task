import { Router } from "express";
import { addReactions } from "../controllers/like";

const router = Router();

router.post("/reaction", addReactions);

export default router;
