// src/server/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; // user bao gồm ID và type
      next();
    });
  };

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) return res.sendStatus(401);
      const { type } = req.user;
      if (!allowedRoles.includes(type)) {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập tài nguyên này.' });
      }
      next();
    };
  };
  
