import React, { useState } from "react";

async function createArticle(articleData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const article = await response.json();
    console.log("Article created:", article);
    return article; // Return the created article
  } catch (error) {
    console.error("Error creating article:", error);
    throw error; // Rethrow to handle it in the component
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
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(articleData);
      setShowModal(false); // Close modal after submission
      setArticleData({ title: "", content: "", author: "" }); // Reset form
      setFeedback("Article created successfully!");
    } catch (error) {
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
              {/* Form fields remain unchanged */}
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
