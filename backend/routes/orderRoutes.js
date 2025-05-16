import express from 'express';
import { getAllOrders, getOrders, updateStatusOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/user", protect, getOrders);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/update/:id", protect, adminOnly, updateStatusOrder);

export default router;