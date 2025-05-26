import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductActions from "../utils/ProductActions";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { 
    ShoppingCart, 
    Heart, 
    Star, 
    Package, 
    Truck, 
    Shield, 
    ArrowLeft,
    Check,
    X,
    Share2,
    Eye,
    ZoomIn
} from "lucide-react";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, addToWishlist } = useProductActions();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const { data } = await API.get(`/product/${slug}`);
                setProduct(data);
            } catch(error){
                console.error("Error fetching product. ", error);
            }
        };

        fetchProduct();
    }, [slug]);

    if(!product) return <p className="text-center p-6">Loading product...</p>;
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <Navbar />

        <div className="max-w-6xl mx-auto py-8 px-4 min-h-screen">
            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    Back to Products
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="card-container rounded-2xl p-4 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="relative group">
                            <img
                                src={product.images?.[selectedImage] || product.images?.[0]}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-xl"
                                />
                            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <ZoomIn size={20} className="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Thumbnail Images */}
                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                    selectedImage === index 
                                    ? 'border-blue-500' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                            <button
                                onClick={() => console.log("Share product")}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                <Share2 size={20} />
                            </button>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {product.rating}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ₹{product.price}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Including all taxes
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm ${
                                product.stock > 0 
                                ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                                : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                            }`}>
                                {product.stock > 0 ? <Check size={16} /> : <X size={16} />}
                                {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-25.5">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Quantity:
                            </label>
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                    -
                                </button>
                                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button 
                                onClick={() => addToCart(product._id)}
                                disabled={product.stock === 0}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button 
                                onClick={() => addToWishlist(product._id)}
                                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                                    isWishlisted
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                                }`}
                                >
                                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                            </button>
                        </div>
                    </div>
                </div>

                    {/* Description */}
                    <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                            <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-500">
                                Write a Review
                            </button>
                        </div>

                        {/* Review Summary */}
                        <div className="flex items-start gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {product.rating || 4.5}
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    {renderStars(product.rating || 4.5)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Based on {product.reviews.views || 128} reviews
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                {/* Rating Breakdown */}
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const percentage = Math.random() * 80 + 10;
                                    const count = Math.floor(Math.random() * 50 + 5);
                                    return (
                                        <div key={star} className="flex items-center gap-2 mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                                {star}★
                                            </span>
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                    />
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className="space-y-4">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <div key={review._id || index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 bg-gradient-to-br ${
                                                index % 3 === 0 ? 'from-blue-500 to-purple-600' :
                                                index % 3 === 1 ? 'from-green-500 to-teal-600' :
                                                'from-orange-500 to-red-600'
                                            } rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                                                {review.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {review.user?.name || 'Anonymous User'}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {review.isVerified && (
                                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                                                            Verified Purchase
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
                                                    {review}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 9h0M7 20v-2M7 20v2M7 20h2m5-10h2m-7 10V10m0 0l5.5-5.5" />
                                                        </svg>
                                                        Helpful ({review.helpfulCount || 0})
                                                    </button>
                                                    <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <p>No reviews yet. Be the first to review this product!</p>
                                </div>
                            )}
                        </div>

                        {/* Load More Reviews */}
                        <div className="text-center mt-6">
                            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Load More Reviews
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    {product.features && (
                        <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                        <Check size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

            </div>
                    {/* Trust Badges */}
                    <div className="mt-4">
                        <div className="grid grid-cols-3">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50">
                                <Truck size={24} className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                                <div className="text-xs font-semibold text-gray-900 dark:text-white">Free Shipping</div>
                                <div className="text-xs text-gray-500">Orders over ₹500</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50">
                                <Shield size={24} className="mx-auto mb-2 text-green-600 dark:text-green-400" />
                                <div className="text-xs font-semibold text-gray-900 dark:text-white">Warranty</div>
                                <div className="text-xs text-gray-500">2 Year Coverage</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50">
                                <Package size={24} className="mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                                <div className="text-xs font-semibold text-gray-900 dark:text-white">Easy Returns</div>
                                <div className="text-xs text-gray-500">30 Day Policy</div>
                            </div>
                        </div>
                    </div>
        </div>
        </div>
    );
};

export default ProductDetails;