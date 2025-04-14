const userController = require('../controllers/user.js');
const { validateSignUp , validateSignIn } = require('../middlewares/validation.js')
const router = require('express').Router();



router.post('/signup',validateSignUp, userController.signUp);
router.post('/signin',validateSignIn , userController.signIn);

module.exports = router;