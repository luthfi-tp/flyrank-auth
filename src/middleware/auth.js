const supabase = require('../supabase');

const authMiddleware = async(req, res, next) => {
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

    // Reject invalid/expired token
    if (error || !data.user) {
        return res.status(401).json({
            error: 'Invalid or expired access token'
        });
    }

    // Attach authenticated user to request
    req.user = data.user;

    // Continue to protected route
    next();
};

module.exports = authMiddleware;