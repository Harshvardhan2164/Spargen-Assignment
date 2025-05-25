import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";
import useVoiceSearch from "../utils/VoiceSearch";
import { 
    Filter, X, ChevronDown, ChevronUp, ArrowLeft, Mic, MicOff, 
    Clock, Percent, Tag, Star, Zap, ArrowRight, Home 
} from "lucide-react";

const DealsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        discount: ''
    });

    // Mock deals data - replace with real API call when backend is ready
    const [allDeals] = useState([
        {
            id: 1,
            slug: 'modern-sofa-deal',
            name: 'Modern 3-Seat Sofa',
            price: 599,
            originalPrice: 899,
            discount: 33,
            category: 'living-room',
            image: '/api/placeholder/300/300',
            rating: 4.8,
            reviews: 124,
            dealType: 'flash',
            timeLeft: '2 days',
            stock: 5
        },
        {
            id: 2,
            slug: 'dining-table-deal',
            name: 'Oak Dining Table Set',
            price: 399,
            originalPrice: 649,
            discount: 38,
            category: 'kitchen',
            image: '/api/placeholder/300/300',
            rating: 4.6,
            reviews: 89,
            dealType: 'weekly',
            timeLeft: '5 days',
            stock: 12
        },
        {
            id: 3,
            slug: 'office-chair-deal',
            name: 'Ergonomic Office Chair',
            price: 199,
            originalPrice: 299,
            discount: 33,
            category: 'office',
            image: '/api/placeholder/300/300',
            rating: 4.7,
            reviews: 203,
            dealType: 'clearance',
            timeLeft: 'Limited stock',
            stock: 3
        },
        {
            id: 4,
            slug: 'bedroom-set-deal',
            name: 'Queen Bedroom Set',
            price: 799,
            originalPrice: 1299,
            discount: 38,
            category: 'bedroom',
            image: '/api/placeholder/300/300',
            rating: 4.9,
            reviews: 156,
            dealType: 'flash',
            timeLeft: '1 day',
            stock: 7
        },
        {
            id: 5,
            slug: 'coffee-table-deal',
            name: 'Glass Coffee Table',
            price: 149,
            originalPrice: 249,
            discount: 40,
            category: 'living-room',
            image: '/api/placeholder/300/300',
            rating: 4.5,
            reviews: 78,
            dealType: 'weekly',
            timeLeft: '3 days',
            stock: 15
        },
        {
            id: 6,
            slug: 'bookshelf-deal',
            name: '5-Tier Bookshelf',
            price: 89,
            originalPrice: 159,
            discount: 44,
            category: 'office',
            image: '/api/placeholder/300/300',
            rating: 4.4,
            reviews: 92,
            dealType: 'clearance',
            timeLeft: '1 day',
            stock: 8
        }
    ]);

    const [filteredDeals, setFilteredDeals] = useState(allDeals);

    // Deal categories for tabs
    const dealTabs = [
        { id: 'all', name: 'All Deals', icon: Tag },
        { id: 'flash', name: 'Flash Sales', icon: Zap },
        { id: 'weekly', name: 'Weekly Deals', icon: Clock },
        { id: 'clearance', name: 'Clearance', icon: Percent }
    ];

    // Voice search callback function
    const handleVoiceTranscript = (transcript) => {
        setFilters(prev => ({ ...prev, search: transcript }));
    };

    const { transcript, startListening, stopListening, listening, clearTranscript, isSupported } = useVoiceSearch(handleVoiceTranscript);

    useEffect(() => {
        let filtered = allDeals;

        // Filter by tab
        if (activeTab !== 'all') {
            filtered = filtered.filter(deal => deal.dealType === activeTab);
        }

        // Filter by search
        if (filters.search) {
            filtered = filtered.filter(deal => 
                deal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                deal.category.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Filter by category
        if (filters.category) {
            filtered = filtered.filter(deal => deal.category === filters.category);
        }

        // Filter by price range
        if (filters.minPrice) {
            filtered = filtered.filter(deal => deal.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(deal => deal.price <= parseFloat(filters.maxPrice));
        }

        // Filter by minimum discount
        if (filters.discount) {
            filtered = filtered.filter(deal => deal.discount >= parseInt(filters.discount));
        }

        setFilteredDeals(filtered);
    }, [filters, activeTab, allDeals]);

    // Simulate loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const clearFilters = () => {
        setFilters({ category: '', minPrice: '', maxPrice: '', search: '', discount: '' });
        clearTranscript();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const handleVoiceSearch = () => {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    const getDealBadgeColor = (dealType) => {
        switch (dealType) {
            case 'flash':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'weekly':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'clearance':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    // Custom ProductCard for deals
    const DealCard = ({ product }) => (
        <div className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Deal Badge */}
            <div className="absolute top-3 left-3 z-10">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDealBadgeColor(product.dealType)}`}>
                    {product.discount}% OFF
                </span>
            </div>

            {/* Stock Warning */}
            {product.stock <= 5 && (
                <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        Only {product.stock} left!
                    </span>
                </div>
            )}

            <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200 dark:bg-gray-700">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{product.reviews} reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>
                    </div>
                </div>

                {/* Time Left */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock size={14} className="mr-1" />
                        {product.timeLeft}
                    </div>
                    <button className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                        View Deal
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="relative py-12 md:py-16 bg-gradient-to-r from-red-500 to-pink-600 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center mb-8 text-sm">
                        <button
                            onClick={goHome}
                            className="icon-btn text-red-100 hover:text-white transition-colors"
                        >
                           ← Back to Home
                        </button>
                    </div>

                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-2/3 mb-8 md:mb-0">
                            <div className="flex items-center mb-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    Unbeatable Deals
                                </h1>
                            </div>
                            <p className="mt-4 text-lg md:text-xl text-red-100 mb-6">
                                Save big on quality furniture with our limited-time offers and flash sales
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                                    <Zap className="text-yellow-300 mr-2" size={20} />
                                    <span className="text-white font-medium">Flash Sales Active</span>
                                </div>
                                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                                    <Percent className="text-green-300 mr-2" size={20} />
                                    <span className="text-white font-medium">Up to 50% Off</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <div className="relative">
                                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                                    <Tag size={48} className="text-yellow-300" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-sm">50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deal Tabs */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto">
                        {dealTabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-red-500 text-red-600 dark:text-red-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <IconComponent size={16} className="mr-2" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12 bg-gray-100 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {dealTabs.find(tab => tab.id === activeTab)?.name || 'All Deals'} 
                            <span className="ml-2 text-lg font-normal text-gray-600 dark:text-gray-400">
                                ({filteredDeals.length} items)
                            </span>
                        </h2>
                        
                        {/* Search & Filter Controls */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search deals or try voice search"
                                    className="px-4 py-2 pr-20 w-full md:w-100 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                />
                                {isSupported && (
                                    <button
                                        type="button"
                                        onClick={handleVoiceSearch}
                                        className={`absolute right-1 p-1 rounded-full transition-all duration-200 ${
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
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Refine Deals</h3>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        />
                                        <div className="text-gray-500 text-center dark:text-gray-400">to</div>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Min. Discount</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        value={filters.discount}
                                        onChange={(e) => setFilters(prev => ({ ...prev, discount: e.target.value }))}
                                    >
                                        <option value="">Any Discount</option>
                                        <option value="10">10% or more</option>
                                        <option value="20">20% or more</option>
                                        <option value="30">30% or more</option>
                                        <option value="40">40% or more</option>
                                    </select>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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

                    {/* Deals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                            : filteredDeals.map((deal) => <DealCard key={deal.id} product={deal} />)
                        }
                    </div>

                    {/* No Deals Found */}
                    {!loading && filteredDeals.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <Tag size={32} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No deals found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or check back later for new deals.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-50 dark:text-white dark:bg-gray-700 text-gray-900 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 transition"
                                >
                                    Clear Filters
                                </button>
                                <button
                                    onClick={goHome}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Browse All Products
                                    <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DealsPage;