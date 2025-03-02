import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import type { User } from '../models/index.js';

export const authRouter = express.Router();

/**
 * POST /api/auth/login
 * Admin login endpoint
 */
authRouter.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    (req: Request, res: Response) => {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { username, password } = req.body;

        // Validate credentials against environment variables
        if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // Create JWT token
            const tokenUser: User = { username, role: 'admin' };
            const token = jwt.sign(
                tokenUser,
                process.env.JWT_SECRET || 'default-secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
            );

            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });

            res.status(200).json({ message: 'Login successful' });
            return;
        }

        res.status(401).json({ message: 'Invalid credentials' });
    }
);

/**
 * POST /api/auth/logout
 * Logout endpoint
 */
authRouter.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

/**
 * GET /api/auth/verify
 * Verify authentication token
 */
authRouter.get('/verify', requireAuth, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Authenticated', user: req.user });
});

export default authRouter;