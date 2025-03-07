import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

// Layout Component for Sidebar, Navbar, and Main Content
const Layout = ({ children }) => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
             {/* Toast Container for Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast-container"
                toastClassName="toast"
                bodyClassName="toast-body"
                progressClassName="toast-progress"
                closeButton={({ closeToast }) => (
                    <button onClick={closeToast} className="toast-close-button">
                        &times;
                    </button>
                )}
            />

            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <Layout>
                            <Customers />
                        </Layout>
                    }
                />

                {/* Default Route */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;