import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
import { Eye, EyeOff, Mail, User, Lock, Shield, CheckCircle } from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

const RegisterUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [captchaInput, setCaptchaInput] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        return requirements;
    };

    const passwordRequirements = validatePassword(password);
    const isPasswordStrong = Object.values(passwordRequirements).every(req => req);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = {};
        
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        if (!isPasswordStrong) newErrors.password = "Password doesn't meet requirements";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        if (!privacyAccepted) newErrors.privacy = "Please accept the Privacy Policy";
        if (!captchaInput) newErrors.captcha = "Please complete the CAPTCHA";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            toast.success("Account created successfully! Please sign in.");
            navigate("/login");
        } catch (error) {
            console.error("Error registering user: ", error.response?.data?.message);
            setErrors({ 
                submit: error.response?.data?.message || "Registration failed. Please try again." 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full opacity-20" 
                     style={{ backgroundColor: 'var(--color-primary)' }}></div>
                <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full opacity-10" 
                     style={{ backgroundColor: 'var(--color-secondary)' }}></div>
            </div>

            <div className="card-container relative z-10 p-8 w-full max-w-lg rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <span className="navbar-logo text-3xl">SPARGEN</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Join us to start your shopping journey</p>
                </div>

                {/* Error Display */}
                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                                    errors.name 
                                        ? 'border-red-300 dark:border-red-600' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ 
                                    '--tw-ring-color': errors.name ? '#ef4444' : 'var(--color-primary)',
                                }}
                                required
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                                    errors.email 
                                        ? 'border-red-300 dark:border-red-600' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ 
                                    '--tw-ring-color': errors.email ? '#ef4444' : 'var(--color-primary)',
                                }}
                                required
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                                    errors.password 
                                        ? 'border-red-300 dark:border-red-600' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ 
                                    '--tw-ring-color': errors.password ? '#ef4444' : 'var(--color-primary)',
                                }}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                        
                        {/* Password Requirements */}
                        {password && (
                            <div className="mt-2 space-y-1">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Password requirements:</p>
                                <div className="grid grid-cols-1 gap-1 text-xs">
                                    {Object.entries({
                                        length: "At least 8 characters",
                                        uppercase: "One uppercase letter",
                                        number: "One number",
                                        special: "One special character"
                                    }).map(([key, text]) => (
                                        <div key={key} className={`flex items-center gap-1 ${
                                            passwordRequirements[key] 
                                                ? 'text-green-700 dark:text-green-400' 
                                                : 'text-gray-400 dark:text-gray-400'
                                        }`}>
                                            <CheckCircle className="h-3 w-3" />
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Shield className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none ${
                                    errors.confirmPassword 
                                        ? 'border-red-300 dark:border-red-600' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ 
                                    '--tw-ring-color': errors.confirmPassword ? '#ef4444' : 'var(--color-primary)',
                                }}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={privacyAccepted}
                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-gray-600 focus:ring-2"
                                style={{ 
                                    '--tw-ring-color': 'var(--color-primary)',
                                    accentColor: 'var(--color-primary)'
                                }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                I agree to the{" "}
                                <Link 
                                    to="/privacy-policy" 
                                    className="font-medium hover:underline transition-colors"
                                    style={{ color: 'var(--color-primary)' }}
                                >
                                    Privacy Policy
                                </Link>{" "}
                                and{" "}
                                <Link 
                                    to="/terms" 
                                    className="font-medium hover:underline transition-colors"
                                    style={{ color: 'var(--color-primary)' }}
                                >
                                    Terms of Service
                                </Link>
                            </span>
                        </label>
                        {errors.privacy && <p className="text-red-500 text-xs">{errors.privacy}</p>}
                    </div>

                    {/* ReCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCaptcha
                            sitekey="6LdpXD0rAAAAAKz7wUNI2ecEtguTxeLnVDB1Gv28"
                            onChange={(value) => setCaptchaInput(value)}
                            theme="light"
                        />
                    </div>
                    {errors.captcha && <p className="text-red-500 text-xs text-center">{errors.captcha}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                Creating Account...
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                Already have an account?
                            </span>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="btn-secondary px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link 
                        to="/" 
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;