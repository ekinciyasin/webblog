import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp/SignUp";

import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import ArticlePage from './components/Articlepage';
import './App.css';
import AdminPage from "./pages/AdminPage/AdminPage";
import Login from "./pages/Login/Login";

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
            element: <HomePage />,
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
            element: <ArticlePage />,
        },
        {
            path: "/new-article",
            element: (
                <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                   <AdminPage/>
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
    ]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} username={username} userRole={userRole} onLogout={handleLogout} />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
