import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AddArticleFormProps {
  onAddArticle: () => void;
}

const AddArticleForm = ({ onAddArticle }: AddArticleFormProps) => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    thumbnail: "",
    authorId: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/articles", article);
      onAddArticle();
      setArticle({
        title: "",
        content: "",
        thumbnail: "",
        authorId: 1,
      });
    } catch (error) {
      console.error("Failed to add article: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="content"
        value={article.content}
        onChange={handleChange}
        placeholder="Content"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="thumbnail"
        value={article.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL"
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Article
      </button>
    </form>
  );
};

export default AddArticleForm;
