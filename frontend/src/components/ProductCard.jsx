import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import useProductActions from "../utils/ProductActions";
import { AuthContext } from "../context/authContext";

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist } = useProductActions();
    const { fetchCartItemsCount } = useContext(AuthContext);

    
    const rating = product.rating || 4.2;
    const reviewCount = product.reviewCount || Math.floor(Math.random() * 50) + 10;
    
    // Check if product is on sale (you can implement your own sale logic)
    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = isOnSale ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Sale Badge */}
            {isOnSale && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                        -{discountPercentage}%
                    </span>
                </div>
            )}
            
            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product._id);
                }}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Add to wishlist"
            >
                <Heart size={18} />
            </button>

            {/* Product Image */}
            <Link to={`/product/${product.slug}`} className="block relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                        src={product.images[0]}
                        loading="lazy"
                        alt={product.name}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-800/90 rounded-md text-sm font-medium text-gray-900 dark:text-white">
                            <Eye size={16} />
                            Quick View
                        </div>
                    </div>
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                    {/* Product Name */}
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                        {product.name}
                    </h3>
                    
                    {/* Product Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={14} 
                                    className={`${
                                        i < Math.floor(rating) 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`} 
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            {rating} ({reviewCount})
                        </span>
                    </div>
                </Link>

                {/* Price Section */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${product.price}
                    </span>
                    {isOnSale && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product._id);
                            () => fetchCartItemsCount();
                        }}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 dark:bg-primary-dark hover:bg-gray-50 dark:hover:bg-primary-dark-hover rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark"
                    >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                    </button>
                    
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToWishlist(product._id);
                        }}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        aria-label="Add to wishlist"
                    >
                        <Heart size={18} />
                    </button>
                </div>
            </div>

            {/* Stock Status (if applicable) */}
            {product.stock !== undefined && (
                <div className="px-4 pb-4">
                    {product.stock > 0 ? (
                        <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {product.stock < 5 ? `Only ${product.stock} left` : 'In Stock'}
                        </div>
                    ) : (
                        <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            Out of Stock
                        </div>
                    )}
                </div>
            )}

            {/* Recently Viewed Badge (if applicable) */}
            {product.isRecentlyViewed && (
                <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Recently Viewed
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProductCard;