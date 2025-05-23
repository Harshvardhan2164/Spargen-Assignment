import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
import { 
    CreditCard, 
    MapPin, 
    Package, 
    ShoppingCart, 
    User, 
    Phone, 
    Mail,
    Home,
    Building,
    Globe,
    Hash,
    CheckCircle,
    Lock
} from "lucide-react";

const CheckoutPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phoneNumber: 9999999999,
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: 9999,
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try{
                const { data } = await API.get("/cart/");
                setCart(data);
            } catch(error){
                console.error("Error fetching cart", error);
            }
        };

        if(user) fetchCart();
    }, [user]);

    const handlePlaceOrder = async () => {
        try{
            const { data } = await API.post("/cart/checkout", { shippingAddress, paymentMethod });

            toast.success("Order Placed");
            navigate("/order-success");

        } catch(error){
            console.error("Failed to place order", error);
        }
    };

    const getFieldIcon = (field) => {
        switch(field) {
            case 'fullName': return <User size={18} />;
            case 'phoneNumber': return <Phone size={18} />;
            case 'address': return <Home size={18} />;
            case 'city': return <Building size={18} />;
            case 'state': return <Building size={18} />;
            case 'country': return <Globe size={18} />;
            case 'postalCode': return <Hash size={18} />;
            default: return <MapPin size={18} />;
        }
    };

    const getFieldLabel = (field) => {
        const labels = {
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            address: "Street Address",
            city: "City",
            state: "State/Province",
            country: "Country",
            postalCode: "Postal Code"
        };
        return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
    };

    const getPaymentIcon = (method) => {
        switch(method) {
            case 'COD': return '💵';
            case 'Credit Card': return '💳';
            case 'Debit Card': return '💳';
            case 'UPI': return '📱';
            default: return '💳';
        }
    };

    const totalAmount = cart?.items?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;

    if (!user || !cart) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                        <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    <ShoppingCart className="text-blue-600 dark:text-blue-400" size={36} />
                    Confirm Your Order
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Review your items and complete your purchase
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Shipping Address Form */}
                <div className="lg:col-span-2">
                    <div className="card-container rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                            Shipping Address
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(shippingAddress).map(([key, value]) => (
                                <div key={key} className={key === 'address' ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {getFieldLabel(key)}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            {getFieldIcon(key)}
                                        </div>
                                        <input
                                            type={key === 'phoneNumber' || key === 'postalCode' ? 'number' : 'text'}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder={`Enter your ${getFieldLabel(key).toLowerCase()}`}
                                            value={value}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="card-container rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <CreditCard className="text-blue-600 dark:text-blue-400" size={24} />
                            Payment Method
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['COD', 'Credit Card', 'Debit Card', 'UPI'].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                        paymentMethod === method
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">{getPaymentIcon(method)}</div>
                                    <div className="text-sm font-semibold">{method}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    {/* Cart Items */}
                    <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Package size={20} />
                            Order Summary
                        </h3>
                        <div className="space-y-3 mb-4">
                            {cart.items.map((item) => (
                                <div key={item.product._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <Package size={16} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {item.product.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            ₹{(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-900 dark:text-white">
                                <span>Total:</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Info */}
                    <div className="card-container rounded-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <Lock className="text-green-600 dark:text-green-400" size={20} />
                            <h4 className="font-semibold text-gray-900 dark:text-white">Secure Checkout</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your payment information is encrypted and secure. We never store your card details.
                        </p>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                        <CheckCircle size={24} />
                        Place Order
                    </button>
                    <button
                        onClick={() => navigate("/cart")}
                        className="w-full bg-gradient-to-r bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                        ← Back to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;