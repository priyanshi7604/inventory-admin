import React from "react";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  // Static data for cards
  const totalCustomers = 200;
  const activeCustomers = 150;
  const inactiveCustomers = 50;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Cards */}
      <div className="dashboard-content">
        <div className="card">
          <div className="card-body">
            <div className="card-icon">
              <FaUsers size={40} color="#3498db" />
            </div>
            <div className="card-info">
              <div className="card-value">{totalCustomers}</div>
              <div className="card-title">Total Customers</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="card-icon">
              <FaUserCheck size={40} color="#2ecc71" />
            </div>
            <div className="card-info">
              <div className="card-value">{activeCustomers}</div>
              <div className="card-title">Active Customers</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="card-icon">
              <FaUserTimes size={40} color="#e74c3c" />
            </div>
            <div className="card-info">
              <div className="card-value">{inactiveCustomers}</div>
              <div className="card-title">Inactive Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Placeholder */}
      <div className="graph-container">
        <h2>User Growth</h2>
        <div className="graph-placeholder">
          <p>Graph will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;