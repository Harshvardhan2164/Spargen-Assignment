import express from 'express';
import { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post("/add", addProduct);
router.get("/", getAllProducts);
router.get("/:slug", getProduct);
router.update("/:slug", updateProduct);
router.delete("/:slug", deleteProduct);

export default router;