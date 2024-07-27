import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get<Article>(
          `http://localhost:3000/api/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article: ", error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="font-semibold p-1 rounded-md mb-4 mt-6 text-xl">
        {article.title}
      </h2>
      <img
        src={article.thumbnail}
        alt={article.title}
        className="rounded-lg mb-4 w-full h-96 object-cover"
      />
      <p className="text-justify">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
