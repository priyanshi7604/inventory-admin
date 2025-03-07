import React from "react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h3>Are you sure you want to logout?</h3>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes, Logout
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;