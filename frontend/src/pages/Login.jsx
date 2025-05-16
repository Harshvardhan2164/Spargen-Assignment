import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login, setUsername } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsernameLocal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        setUsername(username);
        localStorage.setItem("username", username);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="relative z-10 p-8 w-full max-w-md rounded-2xl shadow-xl border border-[#2e2e2e] backdrop-blur-md bg-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsernameLocal(e.target.value)}
                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-xl border border-[#3a3a3a] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        required
                    />
                    <button
                        onClick={() => navigate("/")}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold tracking-wide shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center space-x-4">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-blue-400 hover:text-blue-500 transition-all"
                    >
                        Forgot Password?
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-sm text-blue-400 hover:text-blue-500 transition-all"
                    >
                        Register New User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;