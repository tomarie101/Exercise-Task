import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

// Define the Article type for TypeScript
type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

// Main component to display all articles
function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get<Article[]>("http://localhost:3001/api/articles")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  // Get the current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = articles.slice(indexOfFirstPost, indexOfLastPost);

  // Change pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCreate = (
    articleData: Omit<Article, "id" | "createdAt" | "updatedAt">
  ) => {
    axios
      .post("http://localhost:3001/api/articles", articleData)
      .then((response) => {
        console.log("Article created:", response.data);
        setArticles((prevArticles) => [...prevArticles, response.data]);
      })
      .catch((error) => console.error("Error creating article:", error));
  };

  const handleUpdate = (article: Article) => {
    axios
      .put(`http://localhost:3001/api/articles/${article.id}`, article)
      .then((response) => {
        setArticles((prevArticles) =>
          prevArticles.map((a) => (a.id === article.id ? response.data : a))
        );
      })
      .catch((error) => console.error("Error updating article:", error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      handleUpdate({ ...editingArticle, ...newArticle });
    } else {
      handleCreate(newArticle);
    }
    setNewArticle({ title: "", content: "", author: "" });
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const openModal = (article: Article | null = null) => {
    setIsModalOpen(true);
    if (article) {
      setEditingArticle(article);
      setNewArticle({
        title: article.title,
        content: article.content,
        author: article.author,
      });
    } else {
      setNewArticle({ title: "", content: "", author: "" });
      setEditingArticle(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleDelete = (articleId: number) => {
    axios
      .delete(`http://localhost:3001/api/articles/${articleId}`)
      .then(() => {
        console.log("Article deleted");
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleId)
        );
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Article
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentArticles.map((article) => (
          <div
            key={article.id}
            className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {article.author}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(article.updatedAt).toLocaleString()}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {article.title}
              </h2>
              <p className="mt-4 text-gray-700">{article.content}</p>
              <div className="mt-4 text-gray-500 text-sm">
                Created at: {new Date(article.createdAt).toLocaleString()}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => openModal(article)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={articles.length}
        paginate={paginate}
      />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingArticle ? "Edit Article" : "Add Article"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={newArticle.content}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, content: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={newArticle.author}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, author: e.target.value })
                  }
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  {editingArticle ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Articles;
