import React, { useState } from "react";
import axios from "axios";

// Simplified and polished version of the Create component and createArticle function

// Function to create an article
async function createArticle(articleData) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/articles",
      articleData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status !== 201) throw new Error("Failed to create article");
    console.log("Article created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

function Create() {
  const [showModal, setShowModal] = useState(false);
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(articleData);
      setShowModal(false);
      setArticleData({ title: "", content: "", author: "" });
      setFeedback("Article created successfully!");
    } catch {
      setFeedback("Failed to create article. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Article
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-lg font-bold mb-4">Create Article</h2>
            {feedback && <p>{feedback}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={articleData.title}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                placeholder="Title"
              />
              <textarea
                name="content"
                value={articleData.content}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                placeholder="Content"
              />
              <input
                type="text"
                name="author"
                value={articleData.author}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                placeholder="Author"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
