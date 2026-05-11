import express from 'express';
import { register, login, getMe, updateProfile } from './auth.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // For loading profile data
router.put('/profile', protect, updateProfile); // For saving profile data

export default router;