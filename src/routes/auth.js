const express = require('express');
const supabase = require('../supabase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    return res.status(201).json({
        user: data.user
    });
});

// POST /auth/login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error || !data.session) {
        return res.status(401).json({
            error: 'Invalid login credentials'
        });
    }

    return res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: data.user
    });
});

// POST /auth/logout
router.post('/logout', authMiddleware, async(req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.status(200).json({
        message: 'Logout successful'
    });
});
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       400:
 *         description: Refresh token is required
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', async(req, res) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({
            error: 'Refresh token is required'
        });
    }

    const { data, error } = await supabase.auth.refreshSession({
        refresh_token
    });

    if (error || !data.session) {
        return res.status(401).json({
            error: 'Invalid or expired refresh token'
        });
    }

    return res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    });
});

module.exports = router;