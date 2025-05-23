import { useState, useEffect } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try{
            const { data } = await API.get("/order/");
            setOrders(data);
        } catch(error){
            console.error("Failed to fetch orders");            
        }
    };

    const updateOrder = async (id, value, key) => {
        try{
            await API.put(`/order/update/${id}`, { value, key });
            toast.success("Order updated");
            fetchOrders();
        } catch(error){
            toast.error("Failed to update order");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
            <table className="w-full table-auto text-left">
                <thead>
                <tr>
                    <th className="p-2 border-b">Order ID</th>
                    <th className="p-2 border-b">User</th>
                    <th className="p-2 border-b">Total</th>
                    <th className="p-2 border-b">Status</th>
                    <th className="p-2 border-b">Actions</th>
                    <th className="p-2 border-b">Payment Status</th>
                    <th className="p-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">{order.user?.name}</td>
                    <td className="p-2">₹{order.totalAmount}</td>
                    <td className="p-2">{order.status}</td>
                    <td className="p-2">
                        <select
                        value={order.status}
                        onChange={(e) => updateOrder(order._id, e.target.value, "status")}
                        className="bg-gray-200 dark:bg-gray-600 rounded px-2 py-1"
                        >
                        <option value="Processing">Processing</option>
                        <option value="In-Transit">In-Transit</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        </select>
                    </td>
                    <td className="p-2">{order.paymentStatus}</td>
                    <td className="p-2">
                        <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrder(order._id, e.target.value, "paymentStatus")}
                        className="bg-gray-200 dark:bg-gray-600 rounded px-2 py-1"
                        >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        </select>
                    </td>
                    </tr>
                ))}
                {orders.length === 0 && (
                    <tr>
                    <td colSpan="5" className="text-center p-4">No orders found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;