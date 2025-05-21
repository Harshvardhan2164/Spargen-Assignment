import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";

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
            console.log(data);
            navigate(`/orders`);
        } catch(error){
            console.error("Failed to place order", error);
        }
    };

    if (!user || !cart) return <p className="text-white p-4">Loading...</p>

    return (
        // <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
        //     <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

        //     <div className="grid md:grid-cols-2 gap-6">
        //         {/* Address Form */}
        //         <div className="bg-gray-800 p-4 rounded shadow">
        //         <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        //         {Object.entries(shippingAddress).map(([key, value]) => (
        //             <input
        //             key={key}
        //             className="w-full mb-3 p-2 bg-gray-700 rounded"
        //             placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
        //             value={value}
        //             onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })}
        //             />
        //         ))}
        //         </div>

        //         {/* Payment + Summary */}
        //         <div className="bg-gray-800 p-4 rounded shadow">
        //         <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        //         <select
        //             className="w-full mb-6 p-2 bg-gray-700 rounded"
        //             value={paymentMethod}
        //             onChange={(e) => setPaymentMethod(e.target.value)}
        //         >
        //             <option value="COD">Cash on Delivery</option>
        //             <option value="Credit Card">Credit Card</option>
        //             <option value="Debit Card">Debit Card</option>
        //             <option value="UPI">UPI</option>
        //         </select>

        //         <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        //         {cart.items.map((item) => (
        //             <div key={item.product._id} className="flex justify-between text-sm mb-2">
        //             <span>{item.product.name} x {item.quantity}</span>
        //             <span>₹{item.product.price * item.quantity}</span>
        //             </div>
        //         ))}

        //         <hr className="my-2" />
        //         <p className="text-lg font-bold">
        //             Total: ₹{cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
        //         </p>

        //         <button
        //             onClick={handlePlaceOrder}
        //             className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        //         >
        //             Place Order
        //         </button>
        //         </div>
        //     </div>
        // </div>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white px-6 py-8">
    <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Address Form */}
        <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            {Object.entries(shippingAddress).map(([key, value]) => (
                <input
                    key={key}
                    className="w-full mb-3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })}
                />
            ))}
        </div>

        {/* Payment + Summary */}
        <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <select
                className="w-full mb-6 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                <option value="COD">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
            </select>

            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {cart.items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm mb-2 text-gray-800 dark:text-gray-200">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{item.product.price * item.quantity}</span>
                </div>
            ))}

            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">
                Total: ₹{cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
            </p>

            <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-200"
            >
                Place Order
            </button>
        </div>
    </div>
</div>
    );
};

export default CheckoutPage;