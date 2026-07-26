const express = require('express');
const router = express.Router();
const {
  getNotifications,
  generateNotifications,
  markAsRead,
  createReminder,
  deleteNotification,
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
 * @route   POST /api/v1/notifications/reminder
 * @desc    Create a custom reminder notification
 * @access  Private
 */
router.post('/reminder', createReminder);

/**
 * @route   PUT /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 * 
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete notification by ID
 * @access  Private
 */
router.route('/:id').delete(deleteNotification);
router.put('/:id/read', markAsRead);

module.exports = router;

