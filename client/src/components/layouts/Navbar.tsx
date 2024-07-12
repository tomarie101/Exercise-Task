import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-base-100 top-0 z-50 flex justify-between items-center">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleDropdown}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>
          <ul
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <a href="#">Homepage</a>
            </li>
            <li>
              <a href="#">Users</a>
            </li>
            <li>
              <a href="#">Articles</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <div className="btn btn-ghost btn-circle">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
