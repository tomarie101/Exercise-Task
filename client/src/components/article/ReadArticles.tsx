import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <ReadArticles key={article.id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
