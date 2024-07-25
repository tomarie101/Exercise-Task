import express from "express";
import { searchArticles } from "../controllers/searching";

const router = express.Router();

router.get("/search", searchArticles);

export default router;
