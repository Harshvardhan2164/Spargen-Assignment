import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist, moveToCart } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/add", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/delete/:productId", protect, removeFromWishlist);
router.post("/move", protect, moveToCart);

export default router;