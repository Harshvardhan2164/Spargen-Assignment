import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = async () => {
        try{
            const res = await API.get("/wishlist/", { withCredentials: true });
            setWishlist(res.data.items);
        } catch(error){
            toast.error("Failed to fetch wishlist")
        }
    };

    const handleRemove = async (productId) => {
        try{
            await API.delete(`/wishlist/delete/${productId}`, { withCredentials: true });
            toast.success("Removed from wishlist");
        } catch(error){
            toast.error("Remove failed");
        }
    };

    const moveToCart = async (productId) => {
        try{
            await API.post("/wishlist/move", { productId }, { withCredentials: true });
            toast.success("Moved to cart");
            fetchWishlist();
        } catch(error){
            toast.error("Failed to move");
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">Your wishlist is empty.</p>
            ) : (
                <div className="grid gap-4">
                {wishlist.map((item) => (
                    <div key={item._id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <div className="flex items-center gap-4">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                        <div>
                        <h2 className="font-semibold dark:text-white">{item.product.name}</h2>
                        <p className="text-gray-500">${item.product.price}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => moveToCart(item.product._id)} className="text-indigo-600 hover:underline">
                        Move to Cart
                        </button>
                        <button onClick={() => handleRemove(item.product._id)} className="text-red-500 hover:underline">
                        Remove
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;