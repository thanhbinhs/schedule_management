// src/server/routes/scheduleRoutes.js

import express from 'express';
import {
  getAllSchedules,
  createSchedule,
  // Các controller khác
} from '../controllers/scheduleController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// Lấy danh sách tất cả các Schedule
router.get('/', getAllSchedules);

// Chỉ 'pdt' mới được tạo mới Schedule
router.post('/', authorizeRoles('pdt'), createSchedule);

// Các routes khác

export default router;
