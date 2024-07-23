import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

interface EditArticleFormProps {
  article: Article;
  onEditArticle: (article: Article) => void;
  onClose: () => void; // Prop to handle form closure
}

const EditArticleForm = ({
  article,
  onEditArticle,
  onClose,
}: EditArticleFormProps) => {
  const [updatedArticle, setUpdatedArticle] = useState<Article>(article);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onEditArticle(updatedArticle);
    onClose(); // Close the form after saving
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={updatedArticle.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="thumbnail" className="block text-gray-700">
          Thumbnail URL
        </label>
        <Input
          id="thumbnail"
          name="thumbnail"
          value={updatedArticle.thumbnail}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          value={updatedArticle.content}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">
        Save Article
      </Button>
    </form>
  );
};

export default EditArticleForm;
