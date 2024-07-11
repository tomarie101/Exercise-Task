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

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]); // Use the defined Article type
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>(
        "http://localhost:3001/api/articles"
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fetch article by ID for viewing
  const fetchArticleByIdForView = async (id: number) => {
    try {
      const response = await axios.get<Article>(
        `http://localhost:3001/api/articles/${id}`
      );
      setSelectedArticle(response.data);
      setIsEditModalOpen(false); // Ensure edit modal is closed
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  // Fetch article by ID for editing
  const fetchArticleByIdForEdit = async (id: number) => {
    try {
      const response = await axios.get<Article>(
        `http://localhost:3001/api/articles/${id}`
      );
      setSelectedArticle(response.data);
      setIsEditModalOpen(true); // Open edit modal
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  // Delete article by ID
  const deleteArticle = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Handle opening edit modal
  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setAuthor(article.author);
    setIsEditModalOpen(true);
  };

  // Handle closing edit modal
  const handleCancelEdit = () => {
    setSelectedArticle(null);
    setTitle("");
    setContent("");
    setAuthor("");
    setIsEditModalOpen(false);
  };

  // Handle saving edited article
  const handleSaveEdit = async () => {
    if (selectedArticle) {
      try {
        const response = await axios.put<Article>(
          `http://localhost:3001/api/articles/${selectedArticle.id}`,
          {
            title,
            content,
            author,
          }
        );
        setArticles(
          articles.map((article) =>
            article.id === response.data.id ? response.data : article
          )
        );
        handleCancelEdit();
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  // Render the component
  return (
    <div className="articles-container">
      <h2>Articles</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-light">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Content</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Updated At</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="py-2 px-6">{article.title}</td>
              <td className="py-2 px-6">{article.content}</td>
              <td className="py-2 px-6">{article.author}</td>
              <td className="py-2 px-6">{article.createdAt}</td>
              <td className="py-2 px-6">{article.updatedAt}</td>
              <td className="py-2 px-6">
                <button onClick={() => handleEditClick(article)}>Edit</button>
                <button onClick={() => deleteArticle(article.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedArticle && (
        <div>
          <h2>Edit Article</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
          >
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <br />
            <label>
              Author:
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Articles;
