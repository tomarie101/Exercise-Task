import { useState } from "react";

interface Article {
  id: string;
  title: string;
  author: { userName: string };
  createdAt: string;
}

const ArticleSearch: React.FC = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchArticles({ title, authorName, datePosted });
      setArticles(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name"
        />
        <input
          type="date"
          value={datePosted}
          onChange={(e) => setDatePosted(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>By: {article.author.userName}</p>
            <p>Posted on: {new Date(article.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSearch;
