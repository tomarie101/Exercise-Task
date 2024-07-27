import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchArticlesProps {
  onSearch: (query: string) => void;
}

const SearchArticles: React.FC<SearchArticlesProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Search Articles"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchArticles;
