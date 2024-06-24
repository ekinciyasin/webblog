import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import * as PropTypes from "prop-types";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";


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
]);

function App() {
  return (
      <div>
          <NavBar/>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
