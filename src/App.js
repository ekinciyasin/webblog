import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import BlockItem from "./components/BlockItem";
import ArticlePage from './components/Articlepage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/block-item",
        element: <BlockItem />,
    },
    {
        path: "/article",
        element: <ArticlePage />,
    },
]);

function App() {
    return (
        <div>
            <NavBar />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
