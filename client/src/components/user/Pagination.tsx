import React, { useState } from "react";

type PaginationProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (number: number) => {
    setActivePage(number);
    paginate(number);
  };

  return (
    <nav>
      <ul className="pagination flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${activePage === number ? "active" : ""}`}
          >
            <a
              href="!#"
              className="page-link px-3 py-1 border rounded mx-1 hover:bg-gray-200"
              onClick={() => handlePageClick(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
