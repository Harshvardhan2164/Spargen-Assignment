import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            try{
                const decoded = jwtDecode(token);
                console.log("Decoded user: ", decoded);
                setUser(decoded);
            } catch(error){
                logout();
            }
        }
    }, [token]);

    const login = async (email, password) => {
        try{
            const response = await API.post("/auth/login", {
                email,
                password,
            });

            const userToken = response.data.token;
            localStorage.setItem("token", userToken);
            setToken(userToken);

            const decodedUser = jwtDecode(userToken);
            setUser(decodedUser);
            toast.success("Login successful");
        } catch(error){
            console.error("Login failed.", error.response?.data?.message);
            toast.error("Login failed. Please try again");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken("");
        setUser(null);
        setUsername("");
        navigate("/login");
    };

    const forgotPass = async (email, password) => {
        try{
            await API.post("/auth/forgot-password", {
                email,
                password,
            });

            toast.success("Password updated successfully");
            navigate("/login");
        } catch(error){
            console.error("Password update failed", error.response?.data?.message);
            toast.error("Password updated failed. Please try again.");
        }
    };

    const fetchCartItemsCount = async () => {
        try{
            const { data } = await API.get("/cart/", { withCredentials: true });
            console.log(data.items);
            setCartItems(data.items);
            const total = data.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartItemCount(total);
        } catch(error){
            console.error("Failed to fetch cart item count.");
        }
    };

    useEffect(() => {
        fetchCartItemsCount();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, username, setUsername, forgotPass, cartItems, cartItemCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;