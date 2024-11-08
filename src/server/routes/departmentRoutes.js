// src/server/routes/DepartmentRoutes.js

import express from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departmentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// GET /departments - Accessible by all authenticated users
router.get('/', getAllDepartments);

// GET /departments/:DepartmentID - Accessible by all authenticated users
router.get('/:DepartmentID', getDepartmentById);

// POST /departments - Accessible by 'pdt'
router.post('/', authorizeRoles('pdt'), createDepartment);

// PUT /departments/:DepartmentID - Accessible by 'pdt' and department leaders
router.put('/:DepartmentID', authorizeRoles('pdt', 'department'), updateDepartment);

// DELETE /departments/:DepartmentID - Accessible by 'pdt'
router.delete('/:DepartmentID', authorizeRoles('pdt'), deleteDepartment);

export default router;
