import express from 'express';
import { addToCart, getCart, removeItem, clearCart, checkoutCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove/:productId", protect, removeItem);
router.delete("/clear", protect, clearCart);
router.post("/checkout", protect, checkoutCart);

export default router;