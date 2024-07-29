import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/components/userState";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent } from "@/components/ui/dialog";

interface AddArticleFormProps {
  onAddArticle: () => void;
  onClose: () => void;
}

const AddArticleForm: React.FC<AddArticleFormProps> = ({
  onAddArticle,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState(""); // Add error state

  const user = useRecoilValue(userState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!user || !user.id) {
      setError("You must be logged in to add an article.");
      return;
    }

    // Check if all required fields are filled
    if (!title || !content || !thumbnail) {
      setError("All fields are required.");
      return;
    }

    const newArticle = {
      title,
      content,
      thumbnail,
      authorId: user.id,
    };

    try {
      await axios.post("http://localhost:3000/api/articles", newArticle);
      setTitle("");
      setContent("");
      setThumbnail("");
      onAddArticle(); // Notify parent to refresh article list
      onClose(); // Close the dialog after saving
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        setError("Failed to add article. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <DialogContent>
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add a New Article</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <Input
            className="h-12"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700">
            Thumbnail URL
          </label>
          <Input
            className="h-12"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 ">
            Content
          </label>
          <Textarea
            className="h-80"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Article
        </Button>
      </form>
    </DialogContent>
  );
};

export default AddArticleForm;
