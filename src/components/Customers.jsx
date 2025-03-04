import React, { useState } from "react";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import "../styles/Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "User 1", purchaseBills: 5, saleBills: 10, status: "active" },
    { id: 2, name: "User 2", purchaseBills: 3, saleBills: 7, status: "inactive" },
    { id: 3, name: "User 3", purchaseBills: 8, saleBills: 12, status: "active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleActivate = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, status: "active" } : customer
      )
    );
  };

  const handleDeactivate = (id) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, status: "inactive" } : customer
      )
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="customers">
      <h1>Customers</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <label>
          Filter by Status:
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Purchase Bills</th>
            <th>Sale Bills</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.purchaseBills}</td>
              <td>{customer.saleBills}</td>
              <td>{customer.status}</td>
              <td>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(customer.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="action-btn activate"
                  onClick={() => handleActivate(customer.id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="action-btn deactivate"
                  onClick={() => handleDeactivate(customer.id)}
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;