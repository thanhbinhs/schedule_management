// src/server/routes/ProfessorRoutes.js

import express from 'express';
import {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
} from '../controllers/professorController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// GET /professors - Accessible by 'pdt', 'department'
router.get('/', authorizeRoles('pdt', 'department', 'professor'), getAllProfessors);

// GET /professors/:ProfessorID - Accessible by 'pdt', 'department', 'professor' (self)
router.get(
  '/:ProfessorID',
  authorizeRoles('pdt', 'department', 'professor'),
  getProfessorById
);

// POST /professors - Accessible by 'pdt'
router.post('/', authorizeRoles('pdt', 'department'), createProfessor);

// PUT /professors/:ProfessorID - Accessible by 'pdt', 'professor' (self)
router.put(
  '/:ProfessorID',
  authorizeRoles('pdt','department', 'professor'),
  updateProfessor
);

// DELETE /professors/:ProfessorID - Accessible by 'pdt'
router.delete('/:ProfessorID', authorizeRoles('pdt', 'department'), deleteProfessor);

export default router;
