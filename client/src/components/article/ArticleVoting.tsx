import { useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  likesCount: number;
  dislikesCount: number;
  // Add any other properties of the article object
}

const ArticleVoting = ({ article }: { article: Article }) => {
  const [likesCount, setLikesCount] = useState(article.likesCount);
  const [dislikesCount, setDislikesCount] = useState(article.dislikesCount);

  const handleLikeDislike = async (
    articleId: number,
    userId: number,
    like: boolean
  ) => {
    // Optimistically update the UI
    if (like) {
      setLikesCount((current) => current + 1);
    } else {
      setDislikesCount((current) => current + 1);
    }

    try {
      // Replace with your actual API endpoint
      await axios.post(`/api/articles/${articleId}/vote`, { userId, like });
    } catch (error) {
      // Revert the UI in case of an error
      if (like) {
        setLikesCount((current) => current - 1);
      } else {
        setDislikesCount((current) => current - 1);
      }
      console.error("Failed to record vote", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleLikeDislike(article.id, 1, true)} // Replace 1 with the actual user ID
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
      >
        👍 {likesCount}
      </button>
      <button
        onClick={() => handleLikeDislike(article.id, 1, false)} // Replace 1 with the actual user ID
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
      >
        👎 {dislikesCount}
      </button>
    </div>
  );
};

export default ArticleVoting;
