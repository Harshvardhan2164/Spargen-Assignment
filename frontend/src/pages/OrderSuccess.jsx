import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { 
    CheckCircle, 
    Package, 
    Truck, 
    Mail,
    Clock,
    ArrowRight,
    Download,
    Star
} from "lucide-react";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    navigate("/orders");
                    return 0;
                }
                return prev - 1;
            });
        }, 10000);

        return () => clearInterval(countdownTimer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Main Success Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
                    
                    {/* Success Animation Container */}
                    <div className="relative mb-8">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                            <CheckCircle size={48} className="text-white" />
                        </div>
                        
                        {/* Floating particles effect */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32">
                            <div className="absolute top-2 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                            <div className="absolute top-6 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-300"></div>
                            <div className="absolute bottom-4 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-500"></div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Order Confirmed! 🎉
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Thank you for your purchase! Your order has been successfully placed.
                    </p>

                    {/* Order Details */}
                    {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Package size={20} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-semibold text-gray-900 dark:text-white">Order Number</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">
                                    {orderData.orderNumber}
                                </p>
                            </div>
                            
                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">💰</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">Total Amount</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-lg font-bold">
                                    ₹{orderData.total}
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* What's Next Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What happens next?</h3>
                        <div className="space-y-4">
                            {/* <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Order Confirmation</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        A confirmation email has been sent to {orderData.email}
                                    </p>
                                </div>
                            </div> */}
                            
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Package size={20} className="text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Order Processing</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We'll prepare your items for shipment within 24 hours
                                    </p>
                                </div>
                            </div>
                            
                            {/* <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck size={20} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Delivery</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Expected delivery in {orderData.estimatedDelivery}
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button 
                            onClick={() => navigate("/orders")}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                        >
                            View Order Details
                            <ArrowRight size={20} />
                        </button>
                        
                        <button 
                            onClick={() => navigate("/")}
                            className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    {/* Download Invoice */}
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center justify-center gap-2 mx-auto mb-6 transition-colors">
                        <Download size={18} />
                        Download Invoice
                    </button>

                    {/* Auto Redirect Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-blue-200 dark:border-gray-600">
                        <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                            <Clock size={18} />
                            <span className="text-sm">
                                Redirecting to order history in <span className="font-bold text-blue-600 dark:text-blue-400">{countdown}</span> seconds
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rating Prompt Card */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Star size={20} className="text-yellow-500" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Love our service?</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Help others discover us by leaving a quick review!
                    </p>
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                        Rate Your Experience
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;