import { useContext } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';
import { AuthContext } from "../context/authContext";

const useProductActions = () => {
    const { fetchCartItemsCount } = useContext(AuthContext);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post('/cart/add', { productId, quantity }, { withCredentials: true });
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await API.post('/wishlist/add', { productId }, { withCredentials: true });
      toast.success('Added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  return { addToCart, addToWishlist };
};

export default useProductActions;