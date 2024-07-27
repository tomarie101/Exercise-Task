import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Article {
  id: number;
  title: string;
}

interface SearchArticlesProps {
  articles: Article[];
  onSearch: (query: string) => void;
  onSelectArticle: (id: number) => void;
}

const SearchArticles: React.FC<SearchArticlesProps> = ({
  articles,
  onSearch,
  onSelectArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(true);

    if (query) {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  };

  const handleSelect = (id: number) => {
    onSelectArticle(id);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="relative flex">
      <Input
        type="text"
        placeholder="Search Articles"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch}>Search</Button>
      {showDropdown && filteredArticles.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto">
          {filteredArticles.map((article) => (
            <li
              key={article.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(article.id)}
            >
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchArticles;
