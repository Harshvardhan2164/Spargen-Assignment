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
        <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full table-auto text-center divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Payment Status</th>
                    <th className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 text-center divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-200 dark:hover:bg-gray-950">
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