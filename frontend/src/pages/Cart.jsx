import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try{
            const res = await API.get("/cart/", { withCredentials: true });
            setCart(res.data.items);
        } catch(error){
            console.error("Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try{
            await API.delete(`/cart/remove/${productId}`, { withCredentials: true });
            toast.success("Removed from cart");
            fetchCart();
        } catch(error){
            toast.error("Remove failed")
        }
    };

    const handleUpdate = async (productId, quantity) => {
        if (quantity < 1) return;
        try{
            await API.put(`/cart/update/${productId}`, { quantity }, { withCredentials: true });
            toast.success("Quantity updated");
            fetchCart();
        } catch(error){
            toast.error("Failed to update quantity");
        }
    };

    const handleCheckout = async () => {
        try{
            navigate("/checkout");
        } catch(error){
            toast.error("Checkout failed");
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    const calculateSubtotal = (item) => {
        return (item.product.price * item.quantity).toFixed(2);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
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
                    <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                        <ShoppingBag className="text-blue-600 dark:text-blue-400" size={36} />
                        Your Shopping Cart
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {cart.length === 0 ? "Your cart is waiting to be filled" : `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`}
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="card-container rounded-2xl p-12 text-center backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400 dark:text-gray-500" />
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Discover amazing products and start adding items to your cart.
                            </p>
                            <button 
                                onClick={() => navigate("/")}
                                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                                >
                                Start Shopping
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item._id} className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                <img 
                                                    src={item.product.images[0]} 
                                                    alt={item.product.name} 
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                                    />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        ₹{item.product.price} each
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.product._id)}
                                                    className="icon-btn text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
                                                    title="Remove item"
                                                    >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            {/* Quantity Controls & Price */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleUpdate(item.product._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="icon-btn w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                                                        >
                                                        <Minus size={16} />
                                                    </button>
                                                    <div className="w-16 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-semibold">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        onClick={() => handleUpdate(item.product._id, item.quantity + 1)}
                                                        className="icon-btn w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                                                        >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        ₹{calculateSubtotal(item)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Items ({cart.length})</span>
                                        <span>₹{calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                            <span>Total</span>
                                            <span>₹{calculateTotal()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    className="btn-primary w-full py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center gap-2 group"
                                    >
                                    Proceed to Checkout
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                                    Secure checkout with SSL encryption
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;