const User = require('../models/User');
const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const Prediction = require('../models/Prediction');
const Chat = require('../models/Chat');
const EmailScan = require('../models/EmailScan');
const ReminderLog = require('../models/ReminderLog');
const HealthScore = require('../models/HealthScore');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Format user response payload excluding sensitive fields
 */
const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/v1/user/profile (or /api/user/profile)
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ApiError(404, 'User profile not found'));
    }
    return ApiResponse.send(res, 200, 'User profile retrieved successfully', formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile details
 * @route   PUT /api/v1/user/profile (or /api/user/profile)
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name.trim();
    if (avatar !== undefined) fieldsToUpdate.avatar = avatar;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new ApiError(404, 'User not found'));
    }

    return ApiResponse.send(res, 200, 'User profile updated successfully', formatUserResponse(updatedUser));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change user password
 * @route   PUT /api/v1/user/password (or /api/user/password)
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(new ApiError(400, 'Current password and new password are required'));
    }

    if (newPassword.length < 8) {
      return next(new ApiError(400, 'New password must be at least 8 characters long'));
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(new ApiError(401, 'Invalid current password'));
    }

    user.password = newPassword;
    await user.save();

    return ApiResponse.send(res, 200, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account and perform cascading cleanup
 * @route   DELETE /api/v1/user (or /api/user)
 * @access  Private
 */
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Perform cascading deletion of user associated data
    await Promise.all([
      Bill.deleteMany({ user: userId }),
      Subscription.deleteMany({ user: userId }),
      Notification.deleteMany({ user: userId }),
      Prediction.deleteMany({ user: userId }),
      Chat.deleteMany({ user: userId }),
      EmailScan.deleteMany({ user: userId }),
      ReminderLog.deleteMany({ user: userId }),
      HealthScore.deleteMany({ user: userId }),
    ]);

    await User.findByIdAndDelete(userId);

    // Clear auth cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    return ApiResponse.send(res, 200, 'User account and associated data deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
};
