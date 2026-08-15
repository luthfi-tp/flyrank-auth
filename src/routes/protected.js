const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected profile route
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

// Second protected route
router.get('/dashboard', authMiddleware, async(req, res) => {
    return res.status(200).json({
        message: 'Welcome to your protected dashboard',
        user: {
            id: req.user.id,
            email: req.user.email
        }
    });
});

module.exports = router;