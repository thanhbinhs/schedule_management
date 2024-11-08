// src/server/routes/subjectRoutes.js

import express from 'express';
import {
  getAllSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
  // Các controller khác
} from '../controllers/subjectController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// 'pdt', 'department', và 'professor' đều có thể xem danh sách môn học
router.get('/', authorizeRoles('pdt', 'department', 'professor'), getAllSubjects);

// Chỉ 'pdt' và 'department' mới được tạo mới môn học
router.post('/', authorizeRoles('pdt', 'department'), createSubject);

// 'pdt', 'department', và 'professor' đều có thể xem thông tin môn học
router.get('/:subjectId', authorizeRoles('pdt', 'department', 'professor'), getSubjectById);

// Chỉ 'pdt' và 'department' mới được cập nhật thông tin môn học
router.put('/:subjectId', authorizeRoles('pdt', 'department'), updateSubject);

// Chỉ 'pdt' và 'department' mới được xóa môn học
router.delete('/:subjectId', authorizeRoles('pdt', 'department'), deleteSubject);
// Các routes khác

export default router;
