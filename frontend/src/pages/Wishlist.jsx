import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Star, ArrowRight } from "lucide-react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading] = useState(false);

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
            fetchWishlist();
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

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={14} className="text-yellow-400 fill-current" />);
        }
        
        if (hasHalfStar) {
            stars.push(<Star key="half" size={14} className="text-yellow-400 fill-current opacity-50" />);
        }
        
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300 dark:text-gray-600" />);
        }
        
        return stars;
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-96 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
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
                        <Heart className="text-red-500 fill-current" size={36} />
                        Your Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {wishlist.length === 0 ? "No saved items yet" : `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved for later`}
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="card-container rounded-2xl p-12 text-center backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="max-w-md mx-auto">
                            <Heart size={64} className="mx-auto mb-6 text-gray-400 dark:text-gray-500" />
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Your wishlist is empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Save your favorite items to keep track of what you love and buy them later.
                            </p>
                            <button 
                                onClick={() => console.log("Navigate to shop")}
                                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                                >
                                Discover Products
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Wishlist Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {wishlist.map((item) => (
                                <div key={item._id} className="card-container rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-200 dark:border-gray-700 group">
                                    {/* Product Image */}
                                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <img 
                                            src={item.product.images[0]} 
                                            alt={item.product.name} 
                                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                                            />
                                        
                                        {/* Sale Badge */}
                                        {item.product.isOnSale && (
                                            <div className="absolute top-4 left-4">
                                                <span className="badge badge-sale px-2 py-1 text-xs font-semibold rounded-lg">
                                                    SALE
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemove(item.product._id)}
                                            className="absolute top-4 right-4 icon-btn p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            title="Remove from wishlist"
                                            >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                            {item.product.name}
                                        </h3>
                                        
                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-1">
                                                {renderStars(item.product.rating)}
                                            </div>
                                            {/* <span className="text-sm text-gray-600 dark:text-gray-400">
                                                ({item.product.reviews})
                                                </span> */}
                                        </div>
                                        
                                        {/* Price */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    ₹{item.product.price}
                                                </span>
                                                {item.product.originalPrice && (
                                                    <span className="price-original text-lg">
                                                        ₹{item.product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            {item.product.isOnSale && (
                                                <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">
                                                    Save ₹{(item.product.originalPrice - item.product.price).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="space-y-2">
                                            <button 
                                                onClick={() => moveToCart(item.product._id)}
                                                className="btn-primary w-full py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 group/btn"
                                                >
                                                <ShoppingCart size={18} />
                                                Add to Cart
                                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleRemove(item.product._id)}
                                                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
                                                >
                                                <Heart size={16} className="text-red-500" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-12 card-container rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                        Ready to make a purchase?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Add all your wishlist items to cart with one click.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => {
                                            wishlist.forEach(item => moveToCart(item.product._id));
                                        }}
                                        className="btn-secondary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                                        >
                                        <ShoppingCart size={18} />
                                        Add All to Cart
                                    </button>
                                    <button 
                                        onClick={() => setWishlist([])}
                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300"
                                        >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Wishlist;