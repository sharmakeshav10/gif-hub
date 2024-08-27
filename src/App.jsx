import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import GifPage from "./pages/GifPage";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <GifPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
