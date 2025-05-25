import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { Moon, Sun, User, ShoppingCart, Heart, Package, ChevronDown, ShieldUser } from "lucide-react";
import useDarkMode from "../utils/toggleMode";

const Navbar = () => {
    const { user, username, logout, cartItemCount } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useDarkMode();
    
    const isDark = theme === "dark";

    return (
        <nav className="sticky top-0 z-50 w-full shadow-2xl">
            <div className="w-full py-1 px-4 text-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <p className="text-xs font-medium text-white">
                    Free shipping on orders over ₹2000 | Join our loyalty program for 10% off your first order
                </p>
            </div>
            
            {/* Main navbar */}
            <div className="flex flex-col lg:flex-row items-center w-full bg-white dark:bg-gray-900 shadow-md px-4 lg:px-8 py-3">
                <Link to="/" className="flex items-center navbar-logo">
                    <span 
                        className="font-bold text-2xl tracking-tighter"
                        style={{ color: 'var(--color-primary-text)' }}
                    >
                        HomeCraft
                    </span>
                </Link>
                
                {/* Desktop Menu - Middle Section */}
                <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                    <Link 
                        to="/" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-gray-700 dark:text-gray-200"
                        style={{ 
                            '--hover-color': 'var(--color-primary)',
                            transition: 'color var(--transition-normal) ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-primary-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/category/living-room" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-gray-700 dark:text-gray-200"
                        style={{ 
                            '--hover-color': 'var(--color-primary)',
                            transition: 'color var(--transition-normal) ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-primary-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Living Room
                    </Link>
                    <Link 
                        to="/category/bedroom" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-gray-700 dark:text-gray-200"
                        style={{ transition: 'color var(--transition-normal) ease' }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-primary-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Bedroom
                    </Link>
                    <Link 
                        to="/category/kitchen" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-gray-700 dark:text-gray-200"
                        style={{ transition: 'color var(--transition-normal) ease' }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-primary-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Kitchen
                    </Link>
                    <Link 
                        to="/category/office" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-gray-700 dark:text-gray-200"
                        style={{ transition: 'color var(--transition-normal) ease' }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--color-primary-text)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Office
                    </Link>
                    <Link 
                        to="/deals" 
                        className="navbar-category-link mx-3 text-sm uppercase font-medium text-red-600 dark:text-red-400"
                        style={{ transition: 'color var(--transition-normal) ease' }}
                        onMouseEnter={(e) => {
                            e.target.style.color = isDark ? '#fca5a5' : '#b91c1c';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '';
                        }}
                    >
                        Deals
                    </Link>
                </div>

                {/* User Controls */}
                <div className="flex items-center mt-3 lg:mt-0">
                    {/* Theme toggle */}
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="icon-btn mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        style={{ transition: 'all var(--transition-fast) ease' }}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {!user ? (
                        <>
                            <Link 
                                to="/login" 
                                className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                style={{ 
                                    transition: 'color var(--transition-normal) ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'var(--color-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '';
                                }}
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="btn-primary mx-2 px-4 py-2 text-sm font-medium text-white rounded-md"
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    transition: 'background-color var(--transition-normal) ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'var(--color-primary-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'var(--color-primary)';
                                }}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center">
                            {/* Cart */}
                            <Link 
                                to="/cart" 
                                className="icon-btn mx-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                                style={{ transition: 'all var(--transition-fast) ease' }}
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart size={20} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                            
                            {/* Wishlist */}
                            <Link 
                                to="/wishlist" 
                                className="icon-btn mx-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                style={{ transition: 'all var(--transition-fast) ease' }}
                                aria-label="Wishlist"
                            >
                                <Heart size={20} />
                            </Link>
                            
                            {/* User dropdown */}
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                    style={{ transition: 'all var(--transition-normal) ease' }}
                                    aria-expanded={dropdownOpen}
                                >
                                    <User size={18} className="mr-2" />
                                    <span className="mr-1">{username}</span>
                                    <ChevronDown 
                                        size={16} 
                                        className="transition-transform"
                                        style={{ 
                                            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform var(--transition-normal) ease'
                                        }}
                                    />
                                </button>
                                
                                {dropdownOpen && (
                                    <div 
                                        className="dropdown-menu absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                                        style={{
                                            animation: 'dropdownFadeIn var(--transition-normal) ease'
                                        }}
                                    >
                                        <Link 
                                            to="/profile" 
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            style={{ transition: 'background-color var(--transition-normal) ease' }}
                                        >
                                            <User size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Profile
                                        </Link>
                                        {user.isAdmin && (
                                            <Link 
                                            to="/admin" 
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            style={{ transition: 'background-color var(--transition-normal) ease' }}
                                            >
                                            <ShieldUser size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Admin Panel
                                        </Link>
                                        )}
                                        <Link 
                                            to="/orders" 
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            style={{ transition: 'background-color var(--transition-normal) ease' }}
                                        >
                                            <Package size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Orders
                                        </Link>
                                        <Link 
                                            to="/wishlist" 
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            style={{ transition: 'background-color var(--transition-normal) ease' }}
                                        >
                                            <Heart size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Wishlist
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-200 dark:border-gray-700"
                                            style={{ transition: 'background-color var(--transition-normal) ease' }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;