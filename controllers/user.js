const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const AppError = require('../utils/AppError');
const { JWT_SECRET } = process.env;



const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return new AppError('Invalid email or password', 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new AppError('Invalid email or password', 401);
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}

module.exports = {signUp,signIn};