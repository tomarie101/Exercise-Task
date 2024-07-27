import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import User from "../pages/User";
import Home from "../pages/Home";
import { RecoilRoot } from "recoil";
import Article from "../pages/Article";
import ArticleDetail from "../pages/ArticleDetail";
import Logout from "../pages/Logout";

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
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/users",
    element: <User />,
  },

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/articles",
    element: <Article />,
  },

  {
    path: "/article/:id",
    element: <ArticleDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
