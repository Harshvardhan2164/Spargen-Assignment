import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try{
            const res = await API.get("/cart/", { withCredentials: true });
            setCart(res.data.items);
        } catch(error){
            toast.error("Failed to fetch cart");
        }
    };

    const handleRemove = async (productId) => {
        try{
            await API.delete(`/cart/delete/${productId}`, { withCredentials: true });
            toast.success("Removed from cart");
            fetchCart();
        } catch(error){
            toast.error("Remove failed")
        }
    };

    const handleUpdate = async (productId, quantity) => {
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
            await API.post("/cart/checkout", {}, { withCredentials: true });
            toast.success("Checkout complete");
            fetchCart();
        } catch(error){
            toast.error("Checkout failed");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
            ) : (
                <>
                <div className="grid gap-4">
                    {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded shadow">
                        <div className="flex items-center gap-4">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h2 className="font-semibold dark:text-white">{item.product.name}</h2>
                                <p className="text-gray-500">${item.product.price} x {item.quantity}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                    onClick={() => handleUpdate(item.product._id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-l"
                                    >-</button>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">{item.quantity}</span>
                                    <button
                                    onClick={() => handleUpdate(item.product._id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-r"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleRemove(item.product._id)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                    ))}
                </div>
                <div className="mt-6 text-right">
                    <button onClick={handleCheckout} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                    Checkout
                    </button>
                </div>
                </>
            )}
        </div>
    );
};

export default Cart;