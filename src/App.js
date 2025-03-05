import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route
          path="/customers"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <Customers />
              </div>
            </div>
          }
        />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;