import getMe from '../controllers/me.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.get('/me', protect, getMe);

export default router;
