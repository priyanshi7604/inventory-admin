import React, { useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Url, config } from "../Url";
import "../styles/Dashboard.css";

const Dashboard = () => {
  // State for card data
  const [customerCount, setCustomerCount] = useState(0);
  const [customerActiveCount, setCustomerActiveCount] = useState(0);
  const [customerInactiveCount, setCustomerInactiveCount] = useState(0);

  // State for graph data
  const [userGrowthData, setUserGrowthData] = useState([]);

  // Fetch counts for cards and graph data
  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${Url}/user/data`, config);
      if (response.data.success) {
        const users = response.data.payload;

        // Calculate active and inactive users
        const activeUsers = users.filter((user) => user.isActive).length;
        const inactiveUsers = users.filter((user) => !user.isActive).length;

        setCustomerCount(users.length);
        setCustomerActiveCount(activeUsers);
        setCustomerInactiveCount(inactiveUsers);

        // Prepare data for the graph
        const growthData = users
          .map((user) => {
            // Parse the createdAt field into a Date object
            const createdAtDate = new Date(user.createdAt);

            // Check if the date is valid
            if (isNaN(createdAtDate.getTime())) {
              console.error("Invalid Date:", user.createdAt);
              return null;
            }

            // Format the date as dd/mm/yyyy
            const formattedDate = createdAtDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return {
              date: formattedDate,
              users: users.filter((u) => new Date(u.createdAt) <= createdAtDate).length, // Cumulative count
            };
          })
          .filter((entry) => entry !== null)
          .sort((a, b) => new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-"))); // Sort by date

        // Debugging: Log the final graph data
        console.log("Graph Data:", growthData);

        setUserGrowthData(growthData);
      }
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
              <FaUsers size={40} />
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
              <FaUserCheck size={40} />
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
              <FaUserTimes size={40} />
            </div>
            <div className="card-info">
              <div className="card-value">{customerInactiveCount}</div>
              <div className="card-title">Inactive Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="graph-container">
        <h2>User Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={userGrowthData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;