const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All User management routes require authentication
router.use(protect);

/**
 * @route   GET /api/user/profile or /api/v1/user/profile
 * @desc    Get user profile
 * @access  Private
 * 
 * @route   PUT /api/user/profile or /api/v1/user/profile
 * @desc    Update user profile
 * @access  Private
 * 
 * @route   DELETE /api/user or /api/v1/user
 * @desc    Delete user account
 * @access  Private
 */
router
  .route('/')
  .delete(deleteAccount);

router
  .route('/profile')
  .get(getProfile)
  .put(updateProfile);

/**
 * @route   PUT /api/user/password or /api/v1/user/password
 * @desc    Change user password
 * @access  Private
 */
router.put('/password', changePassword);

module.exports = router;
