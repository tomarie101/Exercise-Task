import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define Article type
type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

function ReadArticles({ article }: { article: Article }) {
  return (
    <div className="max-w-xl mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {article.author}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(article.updatedAt).toLocaleString()}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{article.title}</h2>
        <p className="mt-4 text-gray-700">{article.content}</p>
        <div className="mt-4 text-gray-500 text-sm">
          Created at: {new Date(article.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Fetch articles data from an API
    axios
      .get<Article[]>("http://localhost:3001/api/articles")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      {articles.map((article) => (
        <Link to={`/article/${article.id}`} key={article.id}>
          <ReadArticles article={article} />
        </Link>
      ))}
    </div>
  );
}

// New component to fetch and display a single article by ID
function ArticleById({ articleId }: { articleId: number }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Fetch a single article data from an API by ID
    axios
      .get<Article>(`http://localhost:3001/api/articles/${articleId}`)
      .then((response) => setArticle(response.data))
      .catch((error) => console.error("Error fetching article:", error));
  }, [articleId]);

  return (
    <div className="container mx-auto py-8">
      {article ? <ReadArticles article={article} /> : <p>Article not found</p>}
    </div>
  );
}

export default Articles; // Export Articles component by default. You might also want to export ArticleById if it needs to be used elsewhere.
