import { useState } from "react";
import axios from "axios";

type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
};

const ArticleLikes = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLike = async (
    articleId: number,
    setArticles: React.Dispatch<React.SetStateAction<Article[]>>
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/articles/${articleId}/like`
      );
      if (response.data.article) {
        setArticles((prevArticles) =>
          prevArticles.map((article) =>
            article.id === articleId ? response.data.article : article
          )
        );
      }
    } catch (err) {
      console.error("Error liking article:", err);
      setError("Error liking article");
    }
  };

  return { handleLike, error };
};

export default ArticleLikes;
