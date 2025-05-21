import { useEffect, useState } from "react";
import API from "../services/api";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const { data } = await API.get("/order/");
                setOrders(data);
            } catch(error){
                console.error("Error fetching orders.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        // <div className="max-w-5xl mx-auto p-6 text-white">
        //     <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        //     {loading ? (
        //         <p>Loading...</p>
        //     ) : orders.length === 0 ? (
        //         <p>No orders found.</p>
        //     ) : (
        //         orders.map((order) => (
        //         <div key={order._id} className="bg-gray-800 rounded p-4 mb-4 shadow">
        //             <p><strong>Order ID:</strong> {order._id}</p>

        //             <p><strong>Items:</strong></p>
        //             <ul className="list-disc pl-6">
        //                 {order.items.map((item, idx) => (
        //                     <li key={idx}>
        //                     {item.product?.name || "Product"} × {item.quantity}
        //                     </li>
        //                 ))}
        //             </ul>

        //             <p><strong>Shipping Address:</strong></p>
        //             <p>
        //                 {order.shippingAddress?.fullName}, {order.shippingAddress?.phoneNumber}, {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}, {order.shippingAddress?.postalCode}
        //             </p>

        //             <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        //             <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        //             <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        //             <p><strong>Total:</strong> ₹{order.totalAmount}</p>

        //             <p><strong>Delivery Status:</strong> {order.isDelivered ? "Delivered" : "Pending"}</p>

        //             {order.isDelivered && (
        //             <p><strong>Delivered On:</strong> {new Date(order.deliveredAt).toLocaleString()}</p>
        //             )}
        //         </div>
        //         ))
        //     )}
        // </div>
        <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-white">
    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
    {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading orders...</p>
    ) : orders.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No orders found.</p>
    ) : (
        orders.map((order) => (
            <div key={order._id} className="bg-white rounded p-4 mb-4 shadow dark:bg-gray-800">
                <p className="text-gray-800 dark:text-gray-200">
                    <strong>Order ID:</strong> {order._id}
                </p>

                <p className="text-gray-800 dark:text-gray-200 mt-2">
                    <strong>Items:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    {order.items.map((item, idx) => (
                        <li key={idx}>
                            {item.product?.name || "Product"} × {item.quantity}
                        </li>
                    ))}
                </ul>

                <p className="text-gray-800 dark:text-gray-200 mt-2">
                    <strong>Shipping Address:</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    {order.shippingAddress?.fullName}, {order.shippingAddress?.phoneNumber}, {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}, {order.shippingAddress?.postalCode}
                </p>

                <p className="text-gray-800 dark:text-gray-200 mt-2">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong>Payment Status:</strong> {order.paymentStatus}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-bold mt-2">
                    <strong>Total:</strong> ₹{order.totalAmount}
                </p>

                <p className="text-gray-800 dark:text-gray-200">
                    <strong>Delivery Status:</strong>{" "}
                    <span className={order.isDelivered ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}>
                        {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                </p>

                {order.isDelivered && (
                    <p className="text-gray-800 dark:text-gray-200">
                        <strong>Delivered On:</strong> {new Date(order.deliveredAt).toLocaleString()}
                    </p>
                )}
            </div>
        ))
    )}
</div>
    );
};

export default MyOrders;