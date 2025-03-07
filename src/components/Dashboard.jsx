import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import "../styles/Dashboard.css";
import axios from "axios";
import { Url, config } from "../Url";

const Dashboard = () => {
    // Static data for cards
    const [customerCount, setCustomerCount] = useState(0);
    const [customerActiveCount, setCustomerActiveCount] = useState(0);
    const [customerInactiveCount, setCustomerInactiveCount] = useState(0);

    // Fetch counts for cards
    const fetchCounts = async () => {
        try {
          const response = await axios.get(`${Url}/user`, config);
          const users = response.data.payload;
          
          const activeUsers = users.filter(user => user.isActive).length;
          const inactiveUsers = users.filter(user => !user.isActive).length;
  
          setCustomerCount(users.length);
          setCustomerActiveCount(activeUsers);
          setCustomerInactiveCount(inactiveUsers);
  
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);
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
                            <div className="card-value">{customerCount}</div>
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
                            <div className="card-value">{customerActiveCount}</div>
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
                            <div className="card-value">{customerInactiveCount}</div>
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
