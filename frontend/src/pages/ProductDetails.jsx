import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductActions from "../utils/ProductActions";
import API from "../services/api";

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, addToWishlist } = useProductActions();

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

    const handleAddToCart = async (productId) => {
        try{
            const res = await API.post("/cart/add", {
                productId,
                quantity: 1
            },
            { withCredentials: true }
        );
        alert("Added to Cart");
        } catch(error){
            console.error("Failed to add to cart. ", error);
        }
    };

    const handleAddToWishlist = async (productId) => {
        try{
            const res = await API.post("/wishlist/add", {
                productId,
            },
            { withCredentials: true }
        );

        alert("Added to wishlist");
        } catch(error){
            console.error("Failed to add to wishlist. ", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full md:w-1/2 object-cover rounded"
                />

                <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-blue-600 mb-2">${product.price}</p>
                <p className={`mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>

                <button onClick={() => addToCart(product._id)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">
                    Add to Cart
                </button>
                <button onClick={() => addToWishlist(product._id)} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
                    Add to Wishlist
                </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;