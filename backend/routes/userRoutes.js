import express from "express";
import { getAllUsers, updateRole, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.put("/update/:id", protect, adminOnly, updateRole);
router.delete("/delete/:id", protect, adminOnly, deleteUser);

export default router;