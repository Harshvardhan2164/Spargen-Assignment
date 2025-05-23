import express from 'express';
import { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/add", protect, adminOnly, addProduct);
router.get("/", getAllProducts);
router.get("/:slug", protect, getProduct);
router.put("/update/:slug", protect, adminOnly, updateProduct);
router.delete("/delete/:slug", protect, adminOnly, deleteProduct);

export default router;