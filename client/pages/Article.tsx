import { useEffect, useState } from "react";
import { Car, MoreHorizontal } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
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
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRecoilValue } from "recoil";
import { userState } from "@/components/userState";
import { CardContent } from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

interface Reaction {
  id: number;
  type: string;
  userId: number;
  articleId: number;
}

const Article = () => {
  const [data, setData] = useState<Article[]>(() => {
    const storedArticle = localStorage.getItem("articles");
    return storedArticle ? JSON.parse(storedArticle) : [];
  });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isEditArticleDialogOpen, setIsEditArticleDialogOpen] = useState(false);
  const [reactions, setReactions] = useState<{ [key: number]: Reaction[] }>({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(data));
  }, [data]);

  const user = useRecoilValue(userState);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/articles");
      setData(response.data);
      localStorage.setItem("articles", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch articles: ", error);
    }
  };

  const handleAddArticle = async () => {
    await fetchData(); // Refresh the articles list
    setIsAddArticleDialogOpen(false); // Close the dialog
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`);
      const updatedData = data.filter((article) => article.id !== id);
      setData(updatedData);
      localStorage.setItem("articles", JSON.stringify(updatedData));
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
      const updatedData = data.map((article) =>
        article.id === updatedArticle.id ? response.data : article
      );
      setData(updatedData);
      localStorage.setItem("articles", JSON.stringify(updatedData));
      setSelectedArticle(null);
      setIsEditArticleDialogOpen(false);
    } catch (error) {
      console.error("Failed to update article: ", error);
    }
  };

  const showAddArticleDialog = () => {
    setIsAddArticleDialogOpen(true);
  };

  const hideAddArticleDialog = () => {
    setIsAddArticleDialogOpen(false);
  };

  const showEditArticleDialog = (article: Article) => {
    setSelectedArticle(article);
    setIsEditArticleDialogOpen(true);
  };

  const hideEditArticleDialog = () => {
    setSelectedArticle(null);
    setIsEditArticleDialogOpen(false);
  };

  const handleReaction = async (articleId: number, type: string) => {
    if (!user) {
      alert("You must be logged in to react to an article.");
      return;
    }

    try {
      const userId = user.id;
      const existingReaction = reactions[articleId]?.find(
        (reaction) => reaction.userId === userId
      );

      if (existingReaction) {
        if (existingReaction.type === type) {
          // Remove existing reaction
          await axios.delete(
            `http://localhost:3000/api/reactions/${existingReaction.id}`,
            {
              data: { userId },
            }
          );
          setReactions((prevReactions) => ({
            ...prevReactions,
            [articleId]: prevReactions[articleId].filter(
              (reaction) => reaction.id !== existingReaction.id
            ),
          }));
        } else {
          // Update existing reaction
          await axios.put(
            `http://localhost:3000/api/reactions/${existingReaction.id}`,
            { type, userId }
          );
          setReactions((prevReactions) => ({
            ...prevReactions,
            [articleId]: prevReactions[articleId].map((reaction) =>
              reaction.id === existingReaction.id
                ? { ...reaction, type }
                : reaction
            ),
          }));
        }
      } else {
        // Create a new reaction
        const response = await axios.post(
          `http://localhost:3000/api/reactions`,
          { type, userId, articleId }
        );
        setReactions((prevReactions) => ({
          ...prevReactions,
          [articleId]: [...(prevReactions[articleId] || []), response.data],
        }));
      }
    } catch (error) {
      console.error("Failed to add or update reaction: ", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 mt-8">
      {data.map((article) => (
        <ResizablePanelGroup
          key={article.id}
          direction="vertical"
          className="relative min-h-[400px] max-w-4xl w-full rounded-lg border mb-4 flex flex-col"
        >
          <div>
            <ResizablePanel defaultSize={30} className="relative">
              <div className="relative flex  p-6 bg-gray-100">
                {/* Dropdown Menu */}
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
                    <DropdownMenuItem onClick={showAddArticleDialog}>
                      Add Article
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => showEditArticleDialog(article)}
                    >
                      Edit Article
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteArticle(article.id)}
                    >
                      Delete Article
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Reaction Icons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleReaction(article.id, "like")}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleReaction(article.id, "dislike")}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                </div>
              </div>
            </ResizablePanel>

            {/* Title */}
            <CardContent>
              <h2 className="font-semibold p-1 rounded-md mb-4 mt-6">
                {article.title}
              </h2>
            </CardContent>

            <img
              src={article.thumbnail}
              alt={article.title}
              className=" rounded-lg mb-4 w-full h-96 object-cover"
            />

            {/* Content */}
            <CardContent>
              <div className="flex-grow ">
                <p>{article.content}</p>
              </div>
            </CardContent>
          </div>
        </ResizablePanelGroup>
      ))}

      {/* Add Article Dialog */}
      <Dialog
        open={isAddArticleDialogOpen}
        onOpenChange={setIsAddArticleDialogOpen}
      >
        <DialogContent>
          <AddArticleForm
            onAddArticle={handleAddArticle}
            onClose={hideAddArticleDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog
        open={isEditArticleDialogOpen}
        onOpenChange={setIsEditArticleDialogOpen}
      >
        <DialogContent>
          {selectedArticle && (
            <EditArticleForm
              article={selectedArticle}
              onEditArticle={handleEditArticle}
              onClose={hideEditArticleDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Article;
