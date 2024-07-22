import { useState, ChangeEvent, FormEvent } from "react";
import Article from "pages/Article";

interface EditArticleFormProps {
  article: Article;
  onEditArticle: (article: Article) => void;
}

const EditArticleForm = ({ article, onEditArticle }: EditArticleFormProps) => {
  const [updatedArticle, setUpdatedArticle] = useState<Article>(article);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedArticle({ ...updatedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onEditArticle(updatedArticle);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <input
        type="text"
        name="title"
        value={updatedArticle.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="content"
        value={updatedArticle.content}
        onChange={handleChange}
        placeholder="Content"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="thumbnail"
        value={updatedArticle.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail URL"
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Update Article
      </button>
    </form>
  );
};

export default EditArticleForm;
