import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { 
    Package, 
    Calendar, 
    CreditCard, 
    Truck, 
    CheckCircle, 
    Clock, 
    MapPin, 
    ShoppingBag,
    Eye,
    Download,
    RefreshCw
} from "lucide-react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    
    const fetchOrders = async () => {
        try{
            const { data } = await API.get("/order/user");
            setOrders(data);
        } catch(error){
            console.error("Error fetching orders.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status, isDelivered) => {
        if (isDelivered) return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
        switch (status) {
            case "processing": return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
            case "shipped": return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
            case "delivered": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
            default: return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
        }
    };

    const getStatusIcon = (status, isDelivered) => {
        if (isDelivered) return <CheckCircle size={16} />;
        switch (status) {
            case "processing": return <Clock size={16} />;
            case "shipped": return <Truck size={16} />;
            case "delivered": return <CheckCircle size={16} />;
            default: return <Package size={16} />;
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "paid": return "text-green-600 dark:text-green-400";
            case "pending": return "text-yellow-600 dark:text-yellow-400";
            case "failed": return "text-red-600 dark:text-red-400";
            default: return "text-gray-600 dark:text-gray-400";
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true;
        if (filter === "delivered") return order.isDelivered;
        if (filter === "pending") return !order.isDelivered;
        return order.status === filter;
    });

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <Navbar />

            <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl justify-center font-bold mb-2 flex items-center gap-3">
                        <Package className="text-blue-600 dark:text-blue-400" size={36} />
                        My Orders
                    </h1>
                    <span className="text-gray-600 dark:text-gray-400">
                        {orders.length === 0 ? "No orders yet" : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} found`}
                    </span>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="card-container rounded-2xl p-2 backdrop-blur-sm border border-gray-200 dark:border-gray-700 inline-flex gap-1">
                        {[
                            { key: "all", label: "All Orders", count: orders.length },
                            { key: "delivered", label: "Delivered", count: orders.filter(o => o.isDelivered).length },
                            { key: "shipped", label: "Shipped", count: orders.filter(o => o.status === "shipped").length },
                            { key: "processing", label: "Processing", count: orders.filter(o => o.status === "processing").length }
                        ].map(tab => (
                            <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                filter === tab.key
                                ? "btn-primary text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="card-container rounded-2xl p-12 text-center backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400 dark:text-gray-500" />
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {filter === "all" ? "No orders yet" : `No ${filter} orders`}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                {filter === "all" 
                                    ? "Start shopping to see your orders here."
                                    : `You don't have any ${filter} orders at the moment.`
                                }
                            </p>
                            <button 
                                onClick={() => navigate("/")}
                                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                                >
                                Start Shopping
                                <ShoppingBag size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="card-container rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                                {/* Order Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="mb-4 lg:mb-0">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            Order #{order._id}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={16} />
                                                {order.paymentMethod}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm ${getStatusColor(order.status, order.isDelivered)}`}>
                                            {getStatusIcon(order.status, order.isDelivered)}
                                            {/* {order.isDelivered ? "Delivered" : order.status.charAt(0).toUpperCase() + order.status.slice(1)} */}
                                            <span className={order.isDelivered ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}>
                                                {order.isDelivered ? "Delivered" : "Pending"}
                                            </span>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button className="icon-btn p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg" title="View Details">
                                                <Eye size={16} />
                                            </button>
                                            <button className="icon-btn p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg" title="Download Invoice">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-3 gap-6">
                                    {/* Order Items */}
                                    <div className="lg:col-span-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Package size={18} />
                                            Items Ordered ({order.items.length})
                                        </h4>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                            <Package size={20} className="text-gray-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {item.product?.name || "Product"}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Summary & Details */}
                                    <div className="space-y-6">
                                        {/* Payment & Delivery Status */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Status</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 dark:text-gray-400">Payment:</span>
                                                    <span className={`font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                        {order.paymentStatus}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                                                    <span className={`font-semibold ${order.isDelivered ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}>
                                                        {order.isDelivered ? "Delivered" : "In Transit"}
                                                    </span>
                                                </div>
                                                {order.isDelivered && (
                                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            <strong>Delivered on:</strong><br />
                                                            {new Date(order.deliveredAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Order Total</h4>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                ₹{order.totalAmount}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Including taxes and fees
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin size={18} />
                                        Shipping Address
                                    </h4>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                                        <p className="text-gray-900 dark:text-white font-semibold">
                                            {order.shippingAddress?.fullName}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            {order.shippingAddress?.phoneNumber}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                                            {order.shippingAddress?.address}<br />
                                            {order.shippingAddress?.city}, {order.shippingAddress?.country} {order.shippingAddress?.postalCode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Refresh Button */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => fetchOrders()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300"
                        >
                        <RefreshCw size={18} />
                        Refresh Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;