const express = require('express');
const supabase = require('../supabase');

const router = express.Router();

// Public route
router.get('/public/info', (req, res) => {
    res.status(200).json({
        message: 'Welcome stranger! This info is public.'
    });
});

// Protected route - JWT verification
router.get('/protected/profile', async(req, res) => {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Access token required'
        });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access token required'
        });
    }

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    // Invalid or expired token
    if (error || !data.user) {
        return res.status(401).json({
            error: 'Invalid or expired access token'
        });
    }

    // Valid token
    return res.status(200).json({
        user: {
            id: data.user.id,
            email: data.user.email,
            created_at: data.user.created_at
        }
    });
});

module.exports = router;