import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Article from "../pages/Article";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Article />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
