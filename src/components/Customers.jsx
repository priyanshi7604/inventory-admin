import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import "../styles/Customers.css";
import { Url, config } from "../Url";
import { toast } from "react-toastify";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const URL = Url + "/user";

    // Fetch customers from API
    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${URL}/data`);
            if (response.data.success) {
                const formattedCustomers = response.data.payload.map((user) => ({
                    id: user._id,
                    name: user.username,
                    email: user.email,
                    purchaseBills: user.purchaseBillCount,
                    saleBills: user.saleBillCount,
                    status: user.isActive ? "active" : "inactive",
                }));
                setCustomers(formattedCustomers);
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Delete customer
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`, config);
            toast.success("User deleted successfully!");
            fetchCustomers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user!");
        }
    };

   // Activate user
    const handleActivate = async (id) => {
        try {
            await axios.put(`${URL}/activate/${id}`, config);
            toast.success("User activated successfully!");
            fetchCustomers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to activate user!");
        }
    };

    // Deactivate user
    const handleDeactivate = async (id) => {
        try {
            await axios.put(`${URL}/deactivate/${id}`, config);
            toast.success("User deactivated successfully!");
            fetchCustomers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to deactivate user!");
        }
    };

    // Filter customers by search term and status
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || customer.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="customers">
            <h1>Customers</h1>

            <div className="search-bar">
                <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="filters">
                <label>
                    Filter by Status:
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
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
                            <td>{customer.email}</td>
                            <td>{customer.purchaseBills}</td>
                            <td>{customer.saleBills}</td>
                            <td>{customer.status}</td>
                            <td style={{ display: "flex" }}>
                                <button className="action-btn activate" onClick={() => handleActivate(customer.id)}>
                                    <FaCheck />
                                </button>
                                <button className="action-btn deactivate" onClick={() => handleDeactivate(customer.id)}>
                                    <FaTimes />
                                </button>
                                <button className="action-btn delete" onClick={() => handleDelete(customer.id)}>
                                    <FaTrash />
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
