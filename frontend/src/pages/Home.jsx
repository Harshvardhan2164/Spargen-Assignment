import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import API from "../services/api";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        search: ''
    });

    const fetchProducts = async (filters = {}) => {
        try{
            setLoading(true);

            const queryParams = new URLSearchParams(filters).toString();
            const { data } = await API.get(`/product?${queryParams}`, filters);
            setProducts(data);
        } catch(error){
            console.error("Error fetching products. ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 bg-opacity-90 flex flex-col px-6">
            <Navbar />

            <div className="filters p-4 bg-white dark:bg-gray-800 rounded-md shadow mb-4">
                <h2 className="text-xl font-semibold mb-3">Filters</h2>

                <div className="mb-2">
                    <label className="block mb-1 font-medium">Category:</label>
                    <select
                    className="w-full p-2 border rounded"
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    >
                    <option value="">All</option>
                    <option value="living-room">Living Room</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="office">Office</option>
                    </select>
                </div>

                <div className="flex gap-2 mt-2">
                    <input
                    type="number"
                    placeholder="Min Price"
                    className="p-2 border rounded w-1/2"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    />
                    <input
                    type="number"
                    placeholder="Max Price"
                    className="p-2 border rounded w-1/2"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    />
                </div>

                <button
                    onClick={() => fetchProducts(filters)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Apply Filters
                </button>
            </div>

            <div className="px-4 py-8 max-w-7xl mx-auto">
                {/* <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Explore Home Decor</h1> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    : products.map((product) => <ProductCard key={product.slug} product={product} />)}
                </div>
            </div>
        </div>
    );
};

export default Home;