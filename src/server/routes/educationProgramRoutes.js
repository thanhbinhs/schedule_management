// src/server/routes/educationProgramRoutes.js

import express from 'express';
import {
  getAllEducationPrograms,
  createEducationProgram,
  getEducationProgramById,
  updateEducationProgram,
  deleteEducationProgram
  // Các controller khác
} from '../controllers/educationProgramController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// Chỉ 'pdt' và 'department' mới được xem danh sách tất cả education programs
router.get('/', getAllEducationPrograms);

// Chỉ 'pdt' và 'department'  mới được tạo mới education program
router.post('/', authorizeRoles('pdt', 'department'), createEducationProgram);

// Chỉ 'pdt' và 'department' mới được xem thông tin education program
router.get('/:educationProgramId', getEducationProgramById);

// Chỉ 'pdt' và 'department' mới được cập nhật thông tin education program
router.put('/:educationProgramId', authorizeRoles('pdt', 'department'), updateEducationProgram);

// Chỉ 'pdt' và 'department' mới được xóa education program
router.delete('/:educationProgramId', authorizeRoles('pdt', 'department'), deleteEducationProgram);


// Các routes khác

export default router;
