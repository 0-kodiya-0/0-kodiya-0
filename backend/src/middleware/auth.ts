import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '../models/index.js';

/**
 * Authentication middleware for protected routes
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from cookie
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    // Verify token - avoid using default '1d' as the secret
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret) as User;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};