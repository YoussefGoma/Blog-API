const router = require('express').Router();
const User = require('../models/user');
const userController = require('../controllers/user.js');
const { validateSignUp , validateSignIn } = require('../middlewares/validation.js');
const AppError = require('../utils/AppError.js');



router.post('/signup',validateSignUp, userController.signUp);
router.post('/signin',validateSignIn , userController.signIn);
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return new AppError('user not found', 404);
    }
    res.json(user);
})
 

router.put('/:id', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return new AppError('email is required', 400);
    }
    if(await User.findOne({ email })) {
        return new AppError('email already exists', 400);
    }
    const user = await User.findByIdAndUpdate(req.params.id, { email }, { new: true });
    if (!user) {
        return new AppError('user not found', 404);
    }
    res.json(user);
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return new AppError('user not found', 404);
    }
    res.json({ message: 'user deleted' });
})

module.exports = router;