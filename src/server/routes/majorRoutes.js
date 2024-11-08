// src/server/routes/majorRoutes.js

import express from 'express';
import {
  getAllMajors,
  createMajor,
  getMajorById,
  updateMajor,
  deleteMajor,
  // Các controller khác
} from '../controllers/majorController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);


router.get('/', getAllMajors);

// Chỉ 'pdt'  và 'department' mới được tạo mới major
router.post('/', authorizeRoles('pdt', 'department'), createMajor);

router.get('/:majorId', getMajorById);

// Chỉ 'pdt' và 'department' mới được cập nhật thông tin major
router.put('/:majorId', authorizeRoles('pdt', 'department'), updateMajor);

// Chỉ 'pdt' và 'department' mới được xóa major
router.delete('/:majorId', authorizeRoles('pdt', 'department'), deleteMajor);


// Các routes khác

export default router;
