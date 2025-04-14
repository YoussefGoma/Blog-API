const joi = require('joi');
const AppError = require('../utils/AppError');

const signUpSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(150).required(),
});
const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(150).required(),
});

const validateSignUp = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
        return new AppError(error.details[0].message, 400);
    }
    next();
}
const validateSignIn = (req, res, next) => {
    const { error } = signInSchema.validate(req.body);
    if (error) {
        return new AppError(error.details[0].message, 400);
    }
    next();
}

module.exports = { validateSignUp, validateSignIn };