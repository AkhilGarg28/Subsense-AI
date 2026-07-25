const express = require('express');
const router = express.Router();
const {
  getNotifications,
  generateNotifications,
  markAsRead,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

// All notification routes require authentication
router.use(protect);

/**
 * @route   GET /api/v1/notifications
 * @desc    Get user notifications
 * @access  Private
 * 
 * @route   POST /api/v1/notifications/generate
 * @desc    Trigger smart notification engine for user
 * @access  Private
 */
router.route('/').get(getNotifications).post(generateNotifications);

/**
 * @route   PUT /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', markAsRead);

module.exports = router;
