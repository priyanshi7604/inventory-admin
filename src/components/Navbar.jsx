import React, { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span>Welcome, Admin</span>
      </div>
      <div className="navbar-center">
        <div className="date-picker-container">
          <div
            className="current-date"
          >
            {currentDate}
          </div>
          </div>
          </div>
      <div className="navbar-right">
        

        {/* User Profile Dropdown */}
        <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <FaUserCircle className="profile-icon" />
          <span>Admin</span>
          <FaCaretDown className="dropdown-icon" />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;