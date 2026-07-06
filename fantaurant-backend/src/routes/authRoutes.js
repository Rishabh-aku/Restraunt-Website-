const express = require('express');
const { registerUser, loginUser, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { check } = require('express-validator');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validateRequest, registerUser);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], validateRequest, loginUser);

router.get('/me', protect, getMe);

router.post('/forgot-password', [
  check('email', 'Please include a valid email').isEmail()
], validateRequest, forgotPassword);

router.post('/reset-password/:token', [
  check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], validateRequest, resetPassword);

module.exports = router;
