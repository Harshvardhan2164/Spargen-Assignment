import { Routes, Route } from 'react-router-dom';
import RegisterUser from "./pages/Register";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import CheckoutPage from './pages/Checkout';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<RegisterUser />} />

      <Route path="/forgot-password" element={<ForgotPass />} />

      <Route path="/" element={<Home />} />

      <Route path="/product/:slug" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/order-success" element={<OrderSuccess />} />

      <Route path="/orders" element={<MyOrders />} />

      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;