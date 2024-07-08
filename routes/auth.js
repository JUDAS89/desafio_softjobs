import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getUser } from '../controllers/auth.js';
import { authenticateToken } from '../middlewares/auth.js'

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authenticateToken, getUser);

export { router as authRoutes };