const express = require('express');
const router = express.Router();
const { signup, login, getProfile, logout, googleAuth, forgotPassword, resetPassword } = require('../controllers/authController');
const { signupValidationRules, loginValidationRules } = require('../utils/authValidation');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user account
 * @access  Public
 */
router.post('/signup', signupValidationRules, validate, signup);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate existing user & retrieve token
 * @access  Public
 */
router.post('/login', loginValidationRules, validate, login);

/**
 * @route   POST /api/v1/auth/google
 * @desc    Google OAuth Login / Register
 * @access  Public
 */
router.post('/google', googleAuth);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset token
 * @access  Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password using reset token
 * @access  Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route   GET /api/v1/auth/profile
 * @desc    Retrieve authenticated user profile
 * @access  Private
 */
router.get('/profile', protect, getProfile);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Log out user & clear session cookie
 * @access  Public
 */
router.post('/logout', logout);

module.exports = router;

