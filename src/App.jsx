
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Users from "./pages/Users/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from './components/Articlepage';
import './App.css';
import NewArticle from "./pages/NewArticle/NewArticle";
import Login from "./pages/Login/Login";
import Footer from "./pages/Footer"
import NotFound from "./pages/NotFound";
import DeleteAccount from "./components/DeleteAccount";
import AuthenticationContext from "./state/AuthenticationContext"; // Import the DeleteAccount component

function App() {
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
            path: "/:blockId",
            element: <ArticlePage />,
        },
        {
            path: "/new-article",
            element: (
                <ProtectedRoute >
                    <NewArticle />
                </ProtectedRoute>
            ),
        },
        {
            path: "/users",
            element: (
                <ProtectedRoute >
                    <Users />
                </ProtectedRoute>
            ),
        },
        {
            path: "/delete-account",
            element: (
                <ProtectedRoute>
                    <DeleteAccount />
                </ProtectedRoute>
            ),
        },
        {
            path: "/not-found",
            element: <NotFound />,
        }
    ]);

    return (
        <AuthenticationContext>
            <NavBar/>
            <RouterProvider router={router} />
            <Footer/>
        </AuthenticationContext>
    );
}

export default App;
