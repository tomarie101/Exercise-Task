import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Article from "pages/Article";

interface SearchArticlesProps {
  onSearchResults: (results: Article[]) => void;
  onError: (message: string) => void;
}

const SearchArticles = ({ onSearchResults, onError }: SearchArticlesProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await axios.get(
        `http://localhost:3000/api/articles/search`,
        {
          params: { query: encodedSearchTerm },
        }
      );

      if (response.data.length === 0) {
        onError("No articles found");
        onSearchResults([]);
      } else {
        onError(""); // Clear any previous error message
        onSearchResults(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error:", error);
      }
      onError("Failed to search articles");
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles..."
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default SearchArticles;
