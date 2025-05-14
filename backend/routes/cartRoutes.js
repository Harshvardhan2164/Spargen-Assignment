import express from 'express';
import { addToCart, getCart, removeItem, clearCart, checkoutCart } from '../controllers/cartController.js';

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/remove/:productId", removeItem);
router.delete("/clear", clearCart);
router.post("/checkout", checkoutCart);

export default router;