import { Router } from "express";
import { createVotes } from "../controllers/vote";

const router = Router();

router.post("/vote", createVotes);

export default router;
