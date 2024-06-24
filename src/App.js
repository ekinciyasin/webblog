import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import * as PropTypes from "prop-types";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import BlockItem from "./components/BlockItem";
import ArticlePage from './components/Articlepage';
import './App.css';



const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage  />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

function App() {
    function createTitle()  {
         if(true){
             return "Homepage"
         }
        if(false){
             return "Block"
         }
     }


  return (
      <div>
          <NavBar title={createTitle()}/>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
