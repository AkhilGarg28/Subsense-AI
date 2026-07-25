const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/subscriptionController');
const {
  createSubscriptionValidation,
  updateSubscriptionValidation,
} = require('../utils/subscriptionValidation');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');

// All subscription routes require authentication
router.use(protect);

/**
 * @route   POST /api/v1/subscriptions
 * @desc    Create a new subscription
 * @access  Private
 * 
 * @route   GET /api/v1/subscriptions
 * @desc    Get user subscriptions with filtering, searching, sorting, and pagination
 * @access  Private
 */
router
  .route('/')
  .post(createSubscriptionValidation, validate, createSubscription)
  .get(getSubscriptions);

/**
 * @route   GET /api/v1/subscriptions/:id
 * @desc    Get single subscription by ID
 * @access  Private
 * 
 * @route   PUT /api/v1/subscriptions/:id
 * @desc    Update subscription by ID
 * @access  Private
 * 
 * @route   DELETE /api/v1/subscriptions/:id
 * @desc    Delete subscription by ID
 * @access  Private
 */
router
  .route('/:id')
  .get(getSubscriptionById)
  .put(updateSubscriptionValidation, validate, updateSubscription)
  .delete(deleteSubscription);

module.exports = router;
