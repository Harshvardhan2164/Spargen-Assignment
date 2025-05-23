import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const ForgotPass = () => {
    const { forgotPass } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: New Password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    // Password strength validation
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

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            // In a real app, this would send a reset email
            // For now, we'll simulate success and move to step 2
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            
            setSuccessMessage("Reset code sent to your email!");
            setStep(2);
        } catch (error) {
            setErrors({ email: "Failed to send reset email. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!verificationCode.trim()) newErrors.code = "Verification code is required";
        if (!password) newErrors.password = "New password is required";
        if (!isPasswordStrong) newErrors.password = "Password doesn't meet requirements";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await forgotPass(email, password);
            setSuccessMessage("Password updated successfully!");
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setErrors({ 
                submit: "Failed to reset password. Please check your verification code and try again." 
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

            <div className="card-container relative z-10 p-8 w-full max-w-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <span className="navbar-logo text-3xl">SPARGEN</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {step === 1 ? "Reset Password" : "Create New Password"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step === 1 
                            ? "Enter your email to receive a reset code" 
                            : "Enter the code and create a new password"
                        }
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-600 dark:text-green-400 text-sm">{successMessage}</p>
                    </div>
                )}

                {/* Error Display */}
                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                    </div>
                )}

                {/* Step 1: Email Form */}
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                                    placeholder="Enter your registered email"
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Sending Reset Code...
                                </div>
                            ) : (
                                "Send Reset Code"
                            )}
                        </button>
                    </form>
                )}

                {/* Step 2: Password Reset Form */}
                {step === 2 && (
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        {/* Verification Code */}
                        <div className="space-y-2">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Verification Code
                            </label>
                            <input
                                id="code"
                                type="text"
                                placeholder="Enter 6-digit code from email"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className={`w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border transition-all duration-300 focus:ring-2 focus:outline-none text-center tracking-widest ${
                                    errors.code 
                                        ? 'border-red-300 dark:border-red-600' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                                style={{ 
                                    '--tw-ring-color': errors.code ? '#ef4444' : 'var(--color-primary)',
                                }}
                                maxLength="6"
                                required
                            />
                            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Password
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
                                                    ? 'text-green-600 dark:text-green-400' 
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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your new password"
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

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary flex-2 py-3 px-4 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Remember your password?{" "}
                        <Link 
                            to="/login" 
                            className="font-medium hover:underline transition-colors"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            Sign In
                        </Link>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link 
                            to="/register" 
                            className="font-medium hover:underline transition-colors"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            Register
                        </Link>
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

export default ForgotPass;