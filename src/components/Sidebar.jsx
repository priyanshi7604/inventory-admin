import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import logo from "../assets/StockNest.jpg";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    alert("Logout successful!");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>StockNest</h2>
        </div>

        {/* Menu Items */}
        <ul className="sidebar-menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard" className="menu-link">
              <FaHome className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/customers" ? "active" : ""}>
            <Link to="/customers" className="menu-link">
              <FaUsers className="icon" />
              <span>Customers</span>
            </Link>
          </li>
          <li className={location.pathname === "/settings" ? "active" : ""}>
            <Link to="/settings" className="menu-link">
              <FaCog className="icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </>
  );
};

export default Sidebar;