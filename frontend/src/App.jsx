import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
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
import AdminPanel from './pages/Admin/AdminPanel';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import { AuthContext } from './context/authContext';
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);
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

      <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default App;