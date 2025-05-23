import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/authContext";

const AdminPanel = () => {
    const { user } = useContext(AuthContext);

    if(!user?.isAdmin){
        return (
            <div className="text-center text-red-500 p-8">
                You do not have access to this page.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <nav className="flex gap-4 mb-6">
                <Link to="/admin/users" className="text-blue-500 hover:underline">Users</Link>
                <Link to="/admin/products" className="text-blue-500 hover:underline">Products</Link>
                <Link to="/admin/orders" className="text-blue-500 hover:underline">Orders</Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default AdminPanel;