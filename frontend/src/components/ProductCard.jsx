import { Link } from "react-router-dom";
import useProductActions from "../utils/ProductActions";

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist } = useProductActions();
    return (
        <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800 hover:shadow-lg transition">
            <Link to={`/product/${product.slug}`}>
                <img
                src={product.images[0]}
                loading="lazy"
                alt={product.name}
                className="w-full h-52 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {product.description}
                </p>
                <p className="text-primary font-bold mt-2">${product.price}</p>
            </Link>
            <div className="flex gap-2 mt-3">
                <button
                onClick={() => addToCart(product._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                Add to Cart
                </button>
                <button
                onClick={() => addToWishlist(product._id)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                Wishlist
                </button>
            </div>
        </div>
    );
};

export default ProductCard;