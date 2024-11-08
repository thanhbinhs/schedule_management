// src/server/controllers/AccountController.js

import Account from '../models/Account.js';
import Professor from '../models/Professor.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT
const generateToken = (account) => {
  return jwt.sign(
    { ID: account.ID, type: account.type },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register a new account (Only 'pdt' can create accounts or allow open registration)
export const register = async (req, res) => {
  const { ID, password, type } = req.body;

  // Validate input
  if (!ID || !password || !type) {
    return res.status(400).json({ error: 'ID, password, and type are required.' });
  }

  // Check if account already exists
  const existingAccount = await Account.findByPk(ID);
  if (existingAccount) {
    return res.status(400).json({ error: 'Account with this ID already exists.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the account
    const account = await Account.create({
      ID,
      password: hashedPassword,
      type,
    });

    res.status(201).json({ message: 'Account created successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an account
export const login = async (req, res) => {
  const { ID, password } = req.body;

  // Validate input
  if (!ID || !password) {
    return res.status(400).json({ error: 'ID and password are required.' });
  }

  try {
    // Find the account
    const account = await Account.findByPk(ID);
    if (!account) {
      return res.status(400).json({ error: 'Invalid ID or password.' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, account.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid ID or password.' });
    }

    // Generate JWT
    const token = generateToken(account);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all accounts (Accessible by 'pdt' only)
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({
      attributes: { exclude: ['password'] }, // Exclude password from the response
    });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get account by ID (Accessible by 'pdt' and the account itself)
export const getAccountById = async (req, res) => {
  const { id } = req.params;
  const { ID, type } = req.user;

  // If the user is not 'pdt' and trying to access another account, deny access
  if (type !== 'pdt' && ID !== id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const account = await Account.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found.' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update account (Accessible by 'pdt' and the account itself)
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { ID, type } = req.user;

  // If the user is not 'pdt' and trying to update another account, deny access
  if (type !== 'pdt' && ID !== id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found.' });
    }

    // If password is being updated, hash it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await account.update(req.body);
    res.json({ message: 'Account updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete account (Accessible by 'pdt' only)
export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found.' });
    }

    await account.destroy();

    // If the account is a professor, also delete the associated Professor record
    if (account.type === 'professor') {
      await Professor.destroy({ where: { ProfessorID: id } });
    }

    res.json({ message: 'Account deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
