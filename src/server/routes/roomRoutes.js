// src/server/routes/roomRoutes.js

import express from 'express';
import {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  // Các controller khác
} from '../controllers/roomController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllRooms);

// Chỉ 'pdt'  mới được tạo mới room
router.post('/', authorizeRoles('pdt'), createRoom);

router.get('/:roomId', getRoomById);

// Chỉ 'pdt' mới được cập nhật thông tin room
router.put('/:roomId', authorizeRoles('pdt'), updateRoom);

// Chỉ 'pdt' mới được xóa room
router.delete('/:roomId', authorizeRoles('pdt'), deleteRoom);

// Các routes khác

export default router;
