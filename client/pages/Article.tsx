import { MoreHorizontal } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AddArticleForm from "../src/components/articles/AddArticleForm";
import EditArticleForm from "../src/components/articles/EditArticleForm";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

const Article = () => {
  const [data, setData] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/articles");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch articles: ", error);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`);
      setData(data.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Failed to delete article: ", error);
    }
  };

  const handleEditArticle = async (updatedArticle: Article) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/articles/${updatedArticle.id}`,
        updatedArticle
      );
      setData(
        data.map((article) =>
          article.id === updatedArticle.id ? response.data : article
        )
      );
      setSelectedArticle(null);
    } catch (error) {
      console.error("Failed to update article: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 mt-8">
      {data.map((article) => (
        <ResizablePanelGroup
          key={article.id}
          direction="vertical"
          className="min-h-[300px] max-w-4xl w-full rounded-lg border mb-4"
        >
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6 bg-gray-100">
              <h2 className="font-semibold">{article.title}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedArticle(article)}>
                    Edit Article
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Delete Article
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col h-full items-start p-6 bg-gray-50">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="mb-4 w-full h-auto object-cover"
              />
              <p>{article.content}</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ))}
      <AddArticleForm onAddArticle={fetchData} />
      {selectedArticle && (
        <EditArticleForm
          article={selectedArticle}
          onEditArticle={handleEditArticle}
        />
      )}
    </div>
  );
};

export default Article;
