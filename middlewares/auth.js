const User = require('../models/user');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { JWT_SECRET } = process.env;


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return new AppError('No token provided', 401);
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return new AppError('Failed to authenticate token', 401);
        }
        let userId = decoded.id;
        const user = User.findById(userId);
        if (!user) {
            return new AppError('User not found', 404);
        }
        req.user = user;
        next();
    });
}

module.exports = { verifyToken };

