import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";
import API from "../services/api";
import useVoiceSearch from "../utils/VoiceSearch";
import { Filter, X, ChevronDown, ChevronUp, ArrowLeft, Mic, MicOff, Home } from "lucide-react";
import living_room from "../assets/living-room.jpeg";
import bedroom from "../assets/bedroom.jpg";
import kitchen from "../assets/kitchen.jpg";
import office from "../assets/office.jpg";

const categoryData = {
    'living room': {
        name: 'Living Room',
        title: 'Transform Your Living Space',
        description: 'Discover comfortable sofas, stylish coffee tables, and elegant decor to create the perfect gathering space for family and friends.',
        heroImage: living_room,
    },
    'bedroom': {
        name: 'Bedroom',
        title: 'Create Your Dream Bedroom',
        description: 'Find peaceful retreat furniture including beds, dressers, nightstands, and cozy accessories for the perfect night\'s rest.',
        heroImage: bedroom,
    },
    'kitchen': {
        name: 'Kitchen',
        title: 'Design Your Culinary Haven',
        description: 'Explore functional and beautiful kitchen furniture, dining sets, and storage solutions to make your kitchen the heart of your home.',
        heroImage: kitchen,
    },
    'office': {
        name: 'Office',
        title: 'Build Your Productive Workspace',
        description: 'Create an inspiring work environment with ergonomic chairs, functional desks, and smart storage solutions.',
        heroImage: office,
    }
};

const CategoryPage = () => {
    let { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: category || '',
        minPrice: '',
        maxPrice: '',
        search: ''
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    if(category === 'living-room'){
        category = 'living room';
    }

    // Get category info
    const categoryInfo = categoryData[category] || {
        name: 'Products',
        title: 'Browse Products',
        description: 'Discover our collection of quality furniture and home decor.',
        heroImage: '/api/placeholder/800/400'
    };

    // Voice search callback function
    const handleVoiceTranscript = (transcript) => {
        setFilters(prev => ({ ...prev, search: transcript }));
    };

    const { transcript, startListening, stopListening, listening, clearTranscript, isSupported } = useVoiceSearch(handleVoiceTranscript);

    const fetchProducts = async (reset = false) => {
        try {
            setLoading(true);

            const queryParams = new URLSearchParams({ 
                ...filters, 
                category: category,
                page: reset ? 1 : page, 
                limit: 8
            }).toString();
            
            const { data } = await API.get(`/product?${queryParams}`);

            if (reset) {
                setProducts(data.products);
                setPage(1);
            } else {
                setProducts(prev => [...prev, ...data.products]);
            }

            setHasMore((reset ? 1 : page) < data.pages);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFilters(prev => ({ ...prev, category: category || '' }));
        setPage(1);
        setHasMore(true);
        setProducts([]);
    }, [category]);

    useEffect(() => {
        if (category) {
            fetchProducts(page === 1);
        }
    }, [page, filters, category]);

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

    const clearFilters = () => {
        setFilters({ category: category, minPrice: '', maxPrice: '', search: '' });
        clearTranscript();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts(true);
    };

    const handleVoiceSearch = () => {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const goHome = () => {
        navigate('/');
    };

    // Handle invalid category
    if (category && !categoryData[category]) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">The category you're looking for doesn't exist.</p>
                        <button
                            onClick={goHome}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all"
                        >
                            <Home size={18} className="mr-2" />
                            Go Home
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="relative py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-8 text-sm">
                        <button
                            onClick={goHome}
                            className="icon-btn text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>

                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <div className="flex items-center mb-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {categoryInfo.title}
                                </h1>
                            </div>
                            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                {categoryInfo.description}
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img 
                                src={categoryInfo.heroImage}
                                alt={categoryInfo.name}
                                className="rounded-lg shadow-md w-full object-cover h-64 md:h-80"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="py-12 bg-gray-100 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {categoryInfo.name} Collection
                        </h2>
                        
                        {/* Search & Filter Controls */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search products or try voice search"
                                    className="px-4 py-2 pr-20 w-full md:w-100 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                />
                                {isSupported && (
                                    <button
                                        type="button"
                                        onClick={handleVoiceSearch}
                                        className={`absolute icon-btn right-1 p-1 rounded-full transition-all duration-200 ${
                                            listening 
                                                ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                                                : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                        title={listening ? "Stop listening" : "Start voice search"}
                                    >
                                        {listening ? <MicOff size={16} /> : <Mic size={16} />}
                                    </button>
                                )}
                            </form>
                            
                            <button
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                onClick={() => setShowFilters((prev) => !prev)}
                            >
                                <Filter size={18} className="mr-2" />
                                {showFilters ? 'Hide Filters' : 'Filters'}
                                {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                            </button>
                        </div>
                    </div>

                    {/* Voice Search Status */}
                    {listening && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="flex items-center">
                                <div className="animate-pulse">
                                    <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                                </div>
                                <span className="text-blue-800 dark:text-blue-200 font-medium">
                                    Listening... Speak now
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Show transcript if available */}
                    {transcript && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-green-800 dark:text-green-200">
                                    Voice search: "{transcript}"
                                </span>
                                <button
                                    onClick={clearTranscript}
                                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Expanded Filters Panel */}
                    {showFilters && (
                        <div className="p-6 mb-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Refine Results</h3>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        />
                                        <div className="text-center text-gray-500 dark:text-gray-400">to</div>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-6">
                                <button
                                    onClick={() => fetchProducts(true)}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Apply Filters
                                </button>
                                
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading && page === 1
                            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
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
                            You've reached the end of our {categoryInfo.name.toLowerCase()} collection.
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
                                className="mt-6 px-4 py-2 bg-gray-50 dark:text-white dark:bg-gray-700 text-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CategoryPage;