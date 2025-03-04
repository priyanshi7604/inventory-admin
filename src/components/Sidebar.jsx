import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Company Logo
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* Logo and Branding */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <FaHome className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === "/customers" ? "active" : ""}>
          <Link to="/customers">
            <FaUsers className="icon" />
            <span>Customers</span>
          </Link>
        </li>
        <li className={location.pathname === "/settings" ? "active" : ""}>
          <Link to="/settings">
            <FaCog className="icon" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;