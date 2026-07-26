const Notification = require('../models/Notification');
const { generateNotificationsForUser } = require('../services/notificationService');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get user notifications
 * @route   GET /api/v1/notifications
 * @access  Private
 */
const getNotifications = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [notifications, totalRecords] = await Promise.all([
      Notification.find({ user: req.user._id })
        .sort({ scheduledFor: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments({ user: req.user._id }),
    ]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    return ApiResponse.send(res, 200, 'Notifications retrieved successfully', {
      notifications,
      pagination: {
        page,
        limit,
        totalPages,
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate smart notifications for user
 * @route   POST /api/v1/notifications/generate
 * @access  Private
 */
const generateNotifications = async (req, res, next) => {
  try {
    const generated = await generateNotificationsForUser(req.user._id);
    return ApiResponse.send(res, 201, `Smart notifications engine generated ${generated.length} notification(s)`, {
      count: generated.length,
      notifications: generated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark notification as read
 * @route   PUT /api/v1/notifications/:id/read
 * @access  Private
 */
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { read: true } },
      { new: true }
    );

    if (!notification) {
      return next(new ApiError(404, 'Notification not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Notification marked as read', notification);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a custom reminder / notification
 * @route   POST /api/v1/notifications/reminder
 * @access  Private
 */
const createReminder = async (req, res, next) => {
  try {
    const { title, message, type, priority, scheduledFor } = req.body;

    if (!title || !message) {
      return next(new ApiError(400, 'Title and message are required for reminder'));
    }

    const notification = await Notification.create({
      user: req.user._id,
      title: title.trim(),
      message: message.trim(),
      type: type && ['Bill', 'Subscription', 'System', 'AI'].includes(type) ? type : 'Bill',
      priority: priority && ['Low', 'Medium', 'High'].includes(priority) ? priority : 'Medium',
      scheduledFor: scheduledFor ? new Date(scheduledFor) : Date.now(),
    });

    const ReminderLog = require('../models/ReminderLog');
    await ReminderLog.create({
      user: req.user._id,
      targetType: type || 'Custom',
      reminderType: 'CustomReminder',
      channel: 'InApp',
      sentAt: new Date(),
      status: 'Sent',
      message: message.trim(),
    });

    return ApiResponse.send(res, 201, 'Reminder notification created successfully', notification);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete notification
 * @route   DELETE /api/v1/notifications/:id
 * @access  Private
 */
const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return next(new ApiError(404, 'Notification not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Notification deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  generateNotifications,
  markAsRead,
  createReminder,
  deleteNotification,
};

