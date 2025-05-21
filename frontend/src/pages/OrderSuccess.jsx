import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/orders");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    if (!order) return <div className="text-white p-6">Order not found.</div>

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
            <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
            <p className="mb-2">Order ID: <strong>{order._id}</strong></p>
            <p className="mb-4">You’ll be redirected to your order history shortly.</p>
        </div>
    );
};

export default OrderSuccess;