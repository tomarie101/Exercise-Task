import { useEffect, useState } from "react";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AddArticleForm from "@/components/articles/AddArticleForm";
import EditArticleForm from "@/components/articles/EditArticleForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import Reactions from "@/components/articles/Reactions";
import ExpandText from "@/components/articles/ExpandText";
import { useNavigate } from "react-router-dom";
import SearchArticles from "@/components/articles/SearchArticles";

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

const Article: React.FC<ArticleProps> = () => {
  const [data, setData] = useState<Article[]>(() => {
    const storedArticles = localStorage.getItem("articles");
    return storedArticles ? JSON.parse(storedArticles) : [];
  });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isEditArticleDialogOpen, setIsEditArticleDialogOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Article[]>(data);

  // Pagination state and constants
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(data));
  }, [data]);

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

  const handleAddArticle = async () => {
    await fetchData(); // Refresh the articles list
    setIsAddArticleDialogOpen(false); // Close the dialog
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`);
      const updatedData = data.filter((article) => article.id !== id);
      setData(updatedData);
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

  const handleSelectArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = data.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedQuery) ||
        article.content.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gap-4 mt-3">
      <div className="flex items-center space-x-4 absolute top-2 left-0">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <img src="/menu-icon1.png" alt="Menu" className="h-6 w-6" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col bg-gray-200 text-black">
                <NavigationMenuLink asChild>
                  <Link to="/users">
                    <span>Users</span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/Login">
                    <span>Logout</span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <SearchArticles
        articles={data}
        onSearch={handleSearch}
        onSelectArticle={handleSelectArticle}
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
                    <DropdownMenuItem
                      onClick={() => handleSelectArticle(article.id)}
                    >
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

                <div className="absolute top-4 right-4 flex flex-col space-x-2 mr-4 my-3">
                  <Reactions onClick={() => console.log("Clicked")} />
                </div>
              </div>
            </ResizablePanel>

            <CardContent>
              <h2 className="font-semibold p-1 rounded-md mb-4 mt-6 text-xl">
                {article.title}
              </h2>

              <img
                src={article.thumbnail}
                alt={article.title}
                className="rounded-lg mb-4 w-full h-96 object-cover"
              />

              <div className="flex-grow text-justify">
                <ExpandText maxChars={500}>{article.content}</ExpandText>
              </div>
            </CardContent>
          </div>
        </ResizablePanelGroup>
      ))}

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
