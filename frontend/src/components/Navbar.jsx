// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/authContext";
// import { useContext, useState } from "react";
// import { Moon, Sun } from "lucide-react";
// import useDarkMode from "../utils/toggleMode";

// const Navbar = () => {
//     const { user, username, logout, cartItemCount } = useContext(AuthContext);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [theme, setTheme] = useDarkMode();

//     return (
//         <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
//             <Link to="/" className="text-2xl font-bold text-primary">Spargen</Link>

//             <div className="flex items-center gap-4">
//                 {!user ? (
//                 <>
//                     <button
//                         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                         className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition"
//                     >
//                         {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//                     </button>
//                     <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:underline">Login</Link>
//                     <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:underline">Register</Link>
//                 </>
//                 ) : (
//                 <div className="flex items-center gap-4 relative">
//                     <button
//                         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                         className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition"
//                     >
//                         {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
//                     </button>
//                     <Link to="/cart" className="relative text-sm text-gray-700 dark:text-white hover:underline">
//                         🛒
//                         {cartItemCount > 0 && (
//                             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                             {cartItemCount}
//                             </span>
//                         )}
//                     </Link>
//                     <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="text-gray-800 dark:text-white font-semibold hover:underline"
//                     >
//                     {username}
//                     </button>
//                     {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
//                         <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
//                         <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
//                         <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Wishlist</Link>
//                         <Link
//                         onClick={() => logout()}
//                         className="block w-full px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-500 hover:text-red-100"
//                         >
//                         Logout
//                         </Link>
//                     </div>
//                     )}
//                 </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { Moon, Sun, User, ShoppingCart, Heart, Package, ChevronDown } from "lucide-react";
import useDarkMode from "../utils/toggleMode";

const Navbar = () => {
    const { user, username, logout, cartItemCount } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useDarkMode();
    
    const isDark = theme === "dark";

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Top announcement bar */}
            <div className="w-full bg-primary dark:bg-primary-dark py-1 px-4 text-center">
                <p className="text-xs font-medium text-white">Free shipping on orders over $99 | Join our loyalty program for 10% off your first order</p>
            </div>
            
            {/* Main navbar */}
            <div className="flex flex-col lg:flex-row items-center w-full bg-white dark:bg-gray-900 shadow-md px-4 lg:px-8 py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <span className="font-bold text-2xl tracking-tighter text-primary dark:text-primary-dark">
                        SPARGEN
                    </span>
                    <span className="ml-1 text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">Home</span>
                </Link>
                
                {/* Desktop Menu - Middle Section */}
                <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                    <Link to="/products/living-room" className="mx-3 py-2 text-sm uppercase font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark">
                        Living Room
                    </Link>
                    <Link to="/products/bedroom" className="mx-3 py-2 text-sm uppercase font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark">
                        Bedroom
                    </Link>
                    <Link to="/products/kitchen" className="mx-3 py-2 text-sm uppercase font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark">
                        Kitchen
                    </Link>
                    <Link to="/products/office" className="mx-3 py-2 text-sm uppercase font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark">
                        Office
                    </Link>
                    <Link to="/products/deals" className="mx-3 py-2 text-sm uppercase font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        Deals
                    </Link>
                </div>

                {/* User Controls */}
                <div className="flex items-center mt-3 lg:mt-0">
                    {/* Theme toggle */}
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="p-2 mr-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {!user ? (
                        <>
                            <Link 
                                to="/login" 
                                className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="mx-2 px-4 py-2 text-sm font-medium bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-primary-hover dark:hover:bg-primary-dark-hover"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center">
                            {/* Cart */}
                            <Link 
                                to="/cart" 
                                className="p-2 mx-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
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
                                className="p-2 mx-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                aria-label="Wishlist"
                            >
                                <Heart size={20} />
                            </Link>
                            
                            {/* User dropdown */}
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                                    aria-expanded={dropdownOpen}
                                >
                                    <User size={18} className="mr-2" />
                                    <span className="mr-1">{username}</span>
                                    <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <Link to="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <User size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Profile
                                        </Link>
                                        <Link to="/orders" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Package size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Orders
                                        </Link>
                                        <Link to="/wishlist" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Heart size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                                            Wishlist
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-200 dark:border-gray-700"
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