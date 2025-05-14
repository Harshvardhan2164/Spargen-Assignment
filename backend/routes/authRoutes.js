import express from 'express';
import { register, login, forgotPass } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPass);

export default router;