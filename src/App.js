import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Users from "./pages/Users/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import ArticlePage from './components/Articlepage';
import './App.css';
import NewArticle from "./pages/NewArticle/NewArticle";
import Login from "./pages/Login/Login";
import Footer from "./pages/Footer"
import NotFound from "./pages/NotFound";
import DeleteAccount from "./components/DeleteAccount"; // Import the DeleteAccount component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserRole = localStorage.getItem('userRole');
        const storedUsername = localStorage.getItem('username');

        setIsLoggedIn(storedIsLoggedIn);
        setUserRole(storedUserRole);
        setUsername(storedUsername);
        setLoading(false);
    }, []);

    const handleLogin = (user) => {
        if(user !==undefined){
            setIsLoggedIn(true);
            setUserRole(user.role);
            setUsername(user.username);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('username', user.username);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('');
        setUsername('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage userRole={userRole} />,
        },
        {
            path: "/login",
            element: <Login onLogin={handleLogin} />,
        },
        {
            path: "/signup",
            element: <SignUp onLogin={handleLogin} />,
        },
        {
            path: "/:blockId",
            element: <ArticlePage userRole={userRole} username={username} />,
        },
        {
            path: "/new-article",
            element: (
                <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                    <NewArticle />
                </ProtectedRoute>
            ),
        },
        {
            path: "/users",
            element: (
                <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                    <Users />
                </ProtectedRoute>
            ),
        },
        {
            path: "/delete-account",
            element: (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DeleteAccount />
                </ProtectedRoute>
            ),
        },
        {
            path: "/not-found",
            element: <NotFound />,
        }
    ]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} username={username} userRole={userRole} onLogout={handleLogout} />
            <RouterProvider router={router} />
            <Footer userRole={userRole} />
        </div>
    );
}

export default App;
