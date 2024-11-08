// src/server/routes/AccountRoutes.js

import express from 'express';
import {
  register,
  login,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../controllers/accountController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register); // Only 'pdt' can register new accounts
router.post('/login', login);

// Protected routes
router.use(authenticateToken); // Apply authentication to all routes below

// GET /accounts - Accessible by 'pdt' only
router.get('/', authorizeRoles('pdt'), getAllAccounts);

// GET /accounts/:id - Accessible by 'pdt' and the account itself
router.get('/:ID', authorizeRoles('pdt', 'department', 'professor'), getAccountById);

// PUT /accounts/:id - Accessible by 'pdt' and the account itself
router.put('/:ID', authorizeRoles('pdt', 'department', 'professor'), updateAccount);

// DELETE /accounts/:id - Accessible by 'pdt' only
router.delete('/:ID', authorizeRoles('pdt'), deleteAccount);

export default router;
