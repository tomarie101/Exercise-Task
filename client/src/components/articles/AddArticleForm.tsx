import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/components/userState";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddArticleFormProps {
  onAddArticle: () => void;
}

const AddArticleForm: React.FC<AddArticleFormProps> = ({ onAddArticle }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const user = useRecoilValue(userState);
  console.log("Current user state:", user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add an article.");
      return;
    }

    const newArticle = {
      title,
      content,
      thumbnail,
      authorId: user.id,
    };

    console.log("Submitting article:", newArticle); // Log the article data

    try {
      const response = await axios.post(
        "http://localhost:3000/api/articles",
        newArticle
      );
      console.log("Article created successfully:", response.data);
      setTitle("");
      setContent("");
      setThumbnail("");
      onAddArticle(); // Refresh the articles list
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add a New Article</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <Input
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
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Add Article
      </Button>
    </form>
  );
};

export default AddArticleForm;
