// import React, { useState } from "react";
// import FeatherIcon from "feather-icons-react";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle"
//             onClick={toggleDropdown}
//           >
//             <FeatherIcon icon="menu" className="h-5 w-5 text-gray-500" />
//             <ul
//               className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${
//                 isOpen ? "block" : "hidden"
//               }`}
//             >
//               <li>
//                 <a href="#">Homepage</a>
//               </li>
//               <li>
//                 <a href="#">Users</a>
//               </li>
//               <li>
//                 <a href="#">Articles</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="navbar-center"></div>
//       <div className="navbar-end">
//         <div className="btn btn-ghost btn-circle">
//           <FeatherIcon icon="search" className="h-5 w-5 text-gray-500" />
//           <div className="form-control">
//             <input
//               type="text"
//               placeholder="Search"
//               className="input input-bordered w-24 md:w-auto pl-8"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
