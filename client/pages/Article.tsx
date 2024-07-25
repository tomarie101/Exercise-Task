import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddArticleForm from "@/components/articles/AddArticleForm";
import EditArticleForm from "@/components/articles/EditArticleForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRecoilValue } from "recoil";
import { userState } from "@/components/userState";

import { CardContent } from "@/components/ui/card";
import SearchArticles from "@/components/articles/SearchArticles";
import {
  fetchReactions,
  handleReaction,
  getReactionCount,
  ReactionType,
  Reaction,
} from "@/components/articles/Reactions";
import Searching from "@/components/ui/Searching";
import Voting from "@/components/ui/Voting";

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

interface ArticleProps {
  articleId: number;
  user: { id: number; name: string } | null;
}

const Article: React.FC<ArticleProps> = ({ articleId }) => {
  const [data, setData] = useState<Article[]>(() => {
    const storedArticle = localStorage.getItem("articles");
    return storedArticle ? JSON.parse(storedArticle) : [];
  });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isEditArticleDialogOpen, setIsEditArticleDialogOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Article[]>(data);
  const [userReactions, setUserReactions] = useState<
    Record<number, ReactionType | null>
  >({});
  const [reactions, setReactions] = useState<Record<number, Reaction[]>>({});
  const recoilUser: User = useRecoilValue(userState);

  // Pagination state and constants
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const loadReactions = async () => {
      const reactionData = await fetchReactions();
      setReactions(reactionData);
    };

    loadReactions();
  }, []);

  const onReactionClick = (type: ReactionType) => {
    handleReaction(
      articleId,
      type,
      recoilUser,
      userReactions,
      setUserReactions,
      setReactions
    );
  };
  const fetchData = async () => {
    try {
      const response = await axios.get<Article[]>(
        "http://localhost:3000/api/articles"
      );
      setData(response.data);
      localStorage.setItem("articles", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch articles: ", error);
    }
  };
  // get single article
  const getArticle = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/articles/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch article: ", error);
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
      const response = await axios.put<Article>(
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

  //

  const API_URL = "http://localhost:3000/api/articles/vote"; // Replace with your actual API URL

  const voteOnArticle = async (
    userId: string,
    articleId: string,
    type: "up" | "down"
  ) => {
    try {
      const response = await axios.post(`${API_URL}/vote`, {
        userId,
        articleId,
        type,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.error || "An error occurred while voting"
        );
      }
      throw error;
    }
  };

  const searchArticles = async (params: {
    title?: string;
    authorName?: string;
    datePosted?: string;
  }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/articles/search`,
        { params }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.error || "An error occurred while searching"
        );
      }
      throw error;
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

  const handleViewArticle = async (id: number) => {
    const article = await getArticle(id);
    console.log("Fetched article: ", article);
  };

  const handleSearchResults = (results: Article[]) => {
    setFilteredData(results);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Paginated data
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 mt-8">
      {/* Search Component */}
      <SearchArticles
        onSearchResults={handleSearchResults}
        onError={(message) => console.error(message)}
      />

      {currentItems.map((article) => (
        <ResizablePanelGroup
          key={article.id}
          direction="vertical"
          className="relative min-h-[400px] max-w-4xl w-full rounded-lg border mb-4 flex flex-col"
        >
          <div>
            <ResizablePanel defaultSize={30} className="relative">
              <div className="relative flex p-6 bg-gray-400">
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
                    <DropdownMenuItem onClick={() => handleViewArticle(1)}>
                      View Article
                    </DropdownMenuItem>
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
                <div className="absolute top-4 right-4 flex space-x-2 mr-4 my-3">
                  <svg
                    onClick={() => onReactionClick("LIKE")}
                    className={`w-6 h-6 cursor-pointer ${
                      userReactions[article.id] === "LIKE"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                  <svg
                    onClick={() => onReactionClick("DISLIKE")}
                    className={`w-6 h-6 cursor-pointer ${
                      userReactions[article.id] === "DISLIKE"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                  <span>
                    {getReactionCount(reactions, article.id, "LIKE")} Likes
                  </span>
                  <span>
                    {getReactionCount(reactions, article.id, "DISLIKE")}{" "}
                    Dislikes
                  </span>
                </div>
              </div>
            </ResizablePanel>

            {/* Title */}
            <CardContent>
              <h2 className="font-semibold p-1 rounded-md mb-4 mt-6 text-xl">
                {article.title}
              </h2>

              <img
                src={article.thumbnail}
                alt={article.title}
                className="rounded-lg mb-4 w-full h-96 object-cover"
              />

              {/* Content */}
              <div className="flex-grow text-justify">
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

      {/* Pagination Controls */}
      <div className="flex gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Article;
