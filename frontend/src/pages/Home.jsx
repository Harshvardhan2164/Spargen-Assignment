// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import Navbar from "../components/Navbar";
// import ProductCard from "../components/ProductCard";
// import SkeletonCard from "../components/SkeletonCard";
// import API from "../services/api";

// const Home = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showFilters, setShowFilters] = useState(false);
//     const { user } = useContext(AuthContext);
//     const [filters, setFilters] = useState({
//         category: '',
//         minPrice: '',
//         maxPrice: '',
//         search: ''
//     });
//     const [page, setPage] = useState(1);
//     const [hasMore, sethasMore] = useState(true);

//     const fetchProducts = async (reset = false) => {
//         try{
//             setLoading(true);

//             const queryParams = new URLSearchParams({ ...filters, page, limit: 12 }).toString();
//             const { data } = await API.get(`/product?${queryParams}`, filters);

//             if(reset){
//                 setProducts(data.products);
//             }
//             else{
//                 setProducts(prev => [...prev, ...data.products]);
//             }

//             sethasMore(page < data.pages);
//         } catch(error){
//             console.error("Error fetching products. ", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if(user){
//             fetchProducts(page === 1);
//         }
//     }, [page, filters, user]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if(
//                 window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight &&
//                 !loading &&
//                 hasMore
//             ){
//                 setPage(prev => prev + 1);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [loading, hasMore]);

//     useEffect(() => {
//         setPage(1);
//         sethasMore(true);
//     }, [filters]);

//     const clearFilters = () => {
//         setFilters({ category: '', minPrice: '', maxPrice: '', search: '' });
//     };

//     return (
//         <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white px-6 flex flex-col">
//             <Navbar />

//             <button
//                 className="text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 mt-4 w-fit"
//                 onClick={() => setShowFilters((prev) => !prev)}
//             >
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//             </button>

//             {showFilters && (
//                 <div className="filters p-4 mt-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md shadow mb-4">
//                 <h2 className="text-xl font-semibold mb-3">Filters</h2>

//                 <div className="mb-2">
//                     <label className="block mb-1 font-medium">Category:</label>
//                     <select
//                     className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
//                     value={filters.category}
//                     onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
//                     >
//                     <option value="">All</option>
//                     <option value="living-room">Living Room</option>
//                     <option value="bedroom">Bedroom</option>
//                     <option value="kitchen">Kitchen</option>
//                     <option value="office">Office</option>
//                     </select>
//                 </div>

//                 <div className="flex gap-2 mt-2">
//                     <input
//                     type="number"
//                     placeholder="Min Price"
//                     className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded w-1/2"
//                     value={filters.minPrice}
//                     onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
//                     />
//                     <input
//                     type="number"
//                     placeholder="Max Price"
//                     className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded w-1/2"
//                     value={filters.maxPrice}
//                     onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
//                     />
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                     <button
//                     onClick={() => fetchProducts(filters)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                     Apply Filters
//                     </button>

//                     <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                     >
//                     Clear Filters
//                     </button>
//                 </div>
//                 </div>
//             )}

//             {user ? (
//                 <div className="px-4 py-8 max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {loading && page === 1
//                     ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
//                     : products.map((product) => <ProductCard key={product.slug} product={product} />)}
//                 </div>

//                 {loading && page > 1 && (
//                     <div className="flex justify-center mt-6">
//                     <div className="text-black dark:text-white">Loading more products...</div>
//                     </div>
//                 )}

//                 {!hasMore && !loading && products.length > 0 && (
//                     <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
//                     You've reached the end.
//                     </div>
//                 )}
//                 </div>
//             ) : (
//                 <div className="text-center text-xl text-black dark:text-white py-12">
//                 Please log in to explore products.
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import API from "../services/api";
import { Search, Filter, X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const { user } = useContext(AuthContext);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        search: ''
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [featuredCategories] = useState([
        { id: 'living-room', name: 'Living Room', image: '/api/placeholder/400/250' },
        { id: 'bedroom', name: 'Bedroom', image: '/api/placeholder/400/250' },
        { id: 'kitchen', name: 'Kitchen', image: '/api/placeholder/400/250' },
        { id: 'office', name: 'Office', image: '/api/placeholder/400/250' }
    ]);

    const fetchProducts = async (reset = false) => {
        try {
            setLoading(true);

            const queryParams = new URLSearchParams({ ...filters, page, limit: 12 }).toString();
            const { data } = await API.get(`/product?${queryParams}`, filters);

            if (reset) {
                setProducts(data.products);
            } else {
                setProducts(prev => [...prev, ...data.products]);
            }

            setHasMore(page < data.pages);
        } catch (error) {
            console.error("Error fetching products. ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProducts(page === 1);
        }
    }, [page, filters, user]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight &&
                !loading &&
                hasMore
            ) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [filters]);

    const clearFilters = () => {
        setFilters({ category: '', minPrice: '', maxPrice: '', search: '' });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts(true);
    };

    const selectCategory = (categoryId) => {
        setFilters(prev => ({ ...prev, category: categoryId }));
        window.scrollTo({
            top: document.getElementById('products-section').offsetTop - 100,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Hero Section */}
            {user && (
                <div className="relative py-16 md:py-24 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Create the home you've always wanted
                                </h1>
                                <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    Discover affordable furniture and home decoration that suit your style
                                </p>
                                <div className="mt-8">
                                    <a 
                                        href="#products-section"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Shop Now
                                        <ArrowRight size={18} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <img 
                                    src="/api/placeholder/600/400" 
                                    alt="Modern living room" 
                                    className="rounded-lg shadow-md w-full object-cover h-64 md:h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Browse Section */}
            {user && (
                <div className="py-12 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center md:text-left">
                            Browse by Room
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {featuredCategories.map((category) => (
                                <div 
                                    key={category.id}
                                    className="group cursor-pointer"
                                    onClick={() => selectCategory(category.id)}
                                >
                                    <div className="relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-w-1 aspect-h-1 h-40 md:h-56">
                                        <img 
                                            src={category.image} 
                                            alt={category.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-lg font-medium text-white">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Products Section */}
            <div id="products-section" className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {filters.category ? 
                                filters.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 
                                'All Products'}
                        </h2>
                        
                        {/* Search & Filter Controls */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                            <form onSubmit={handleSearchSubmit} className="relative flex">
                                <input
                                    type="text"
                                    placeholder="Search products"
                                    className="px-4 py-2 pr-10 w-full md:w-56 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-0 top-0 bottom-0 px-3 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark"
                                >
                                    <Search size={18} />
                                </button>
                            </form>
                            
                            <button
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => setShowFilters((prev) => !prev)}
                            >
                                <Filter size={18} className="mr-2" />
                                {showFilters ? 'Hide Filters' : 'Filters'}
                                {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                            </button>
                        </div>
                    </div>

                    {/* Expanded Filters Panel */}
                    {showFilters && (
                        <div className="filters p-6 mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Refine Results</h3>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        value={filters.category}
                                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                    >
                                        <option value="">All Categories</option>
                                        <option value="living-room">Living Room</option>
                                        <option value="bedroom">Bedroom</option>
                                        <option value="kitchen">Kitchen</option>
                                        <option value="office">Office</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        />
                                        <span className="text-gray-500 dark:text-gray-400">to</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-end gap-3">
                                    <button
                                        onClick={() => fetchProducts(true)}
                                        className="flex-1 px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-primary-hover dark:hover:bg-primary-dark-hover transition"
                                    >
                                        Apply Filters
                                    </button>
                                    
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {user ? (
                        <>
                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {loading && page === 1
                                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                                    : products.map((product) => <ProductCard key={product.slug} product={product} />)
                                }
                            </div>

                            {/* Loading States */}
                            {loading && page > 1 && (
                                <div className="flex justify-center mt-10">
                                    <div className="inline-flex items-center px-4 py-2 text-gray-700 dark:text-gray-300">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading more products...
                                    </div>
                                </div>
                            )}

                            {/* End Message */}
                            {!hasMore && !loading && products.length > 0 && (
                                <div className="text-center text-gray-500 dark:text-gray-400 mt-10 pb-8">
                                    You've reached the end of our collection.
                                </div>
                            )}

                            {/* No Products */}
                            {!loading && products.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                        <X size={32} className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No products found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-6 px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-primary-hover dark:hover:bg-primary-dark-hover transition"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-16 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <img src="/api/placeholder/120/120" alt="Login required" className="mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Please log in to explore our products</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Sign in to view our collection and start shopping</p>
                            <div className="flex justify-center gap-4">
                                <a href="/login" className="px-6 py-2 bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-primary-hover dark:hover:bg-primary-dark-hover transition">
                                    Log In
                                </a>
                                <a href="/register" className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                    Register
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;