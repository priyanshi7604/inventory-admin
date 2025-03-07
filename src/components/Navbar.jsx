import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    alert("Logout successful!");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsProfileOpen(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span>Welcome, Admin</span>
        </div>
        <div className="navbar-center">
          <div className="date-picker-container">
            <div className="current-date">{currentDate}</div>
          </div>
        </div>
        <div className="navbar-right">
          <div
            className="user-profile"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FaUserCircle className="profile-icon" />
            <span>Admin</span>
            <FaCaretDown className="dropdown-icon" />
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item">
                  <button onClick={handleLogoutClick}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

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

export default Navbar;