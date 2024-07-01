
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Users from "./pages/Users/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from './pages/Article/Articlepage';
import './App.css';
import NewArticle from "./pages/NewArticle/NewArticle";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer"
import NotFound from "./pages/NotFound/NotFound";
import AccountPage from "./pages/Account/AccountPage";
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
                <ProtectedRoute  role={["ADMIN"]}>
                    <NewArticle />
                </ProtectedRoute>
            ),
        },
        {
            path: "/users",
            element: (
                <ProtectedRoute role={["ADMIN"]} >
                    <Users />
                </ProtectedRoute>
            ),
        },
        {
            path: "/account-page",
            element: (
                <ProtectedRoute  role ={["USER", "ADMIN"]}>
                    <AccountPage />
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
