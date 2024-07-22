import express from "express";
import {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/article";

const router = express.Router();

router.post("/", createArticle);
router.get("/:id", getArticle);
router.get("/", getArticles);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
