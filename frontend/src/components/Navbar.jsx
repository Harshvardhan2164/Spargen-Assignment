import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";

const Navbar = () => {
    const { user, username, logout, cartItemCount } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
            <Link to="/" className="text-2xl font-bold text-primary">Spargen</Link>

            <div className="flex items-center gap-4">
                {!user ? (
                <>
                    <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:underline">Login</Link>
                    <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:underline">Register</Link>
                </>
                ) : (
                <div className="flex items-center gap-4 relative">
                    <Link to="/cart" className="relative text-sm text-gray-700 dark:text-white hover:underline">
                        🛒
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-gray-800 dark:text-white font-semibold hover:underline"
                    >
                    {username}
                    </button>
                    {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                        <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
                        <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Wishlist</Link>
                        <Link
                        onClick={() => logout()}
                        className="block w-full px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-500 hover:text-red-100"
                        >
                        Logout
                        </Link>
                    </div>
                    )}
                </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;