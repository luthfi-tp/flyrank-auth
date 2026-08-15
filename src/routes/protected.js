const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /protected/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *       401:
 *         description: Access token required or invalid
 */
router.get('/profile', authMiddleware, async(req, res) => {
    const user = req.user;

    return res.status(200).json({
        user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        }
    });
});

/**
 * @swagger
 * /protected/dashboard:
 *   get:
 *     summary: Access protected dashboard
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected dashboard accessed successfully
 *       401:
 *         description: Access token required or invalid
 */
router.get('/dashboard', authMiddleware, async(req, res) => {
    return res.status(200).json({
        message: 'Welcome to your protected dashboard',
        user: {
            id: req.user.id,
            email: req.user.email
        }
    });
});

/**
 * @swagger
 * /protected/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user returned successfully
 *       401:
 *         description: Access token required or invalid
 */
router.get('/me', authMiddleware, async(req, res) => {
    return res.status(200).json({
        message: 'Authenticated user',
        user: {
            id: req.user.id,
            email: req.user.email,
            created_at: req.user.created_at
        }
    });
});

module.exports = router;