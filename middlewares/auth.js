const jwt = require('jsonwebtoken');

const ensureAuthenticate = (req, res, next) => {

    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Unauthorized | JWT token wrong or expired',
            success: false
        })
    }
}

module.exports = ensureAuthenticate;