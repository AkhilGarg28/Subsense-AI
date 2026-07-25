const { body } = require('express-validator');

/**
 * Validation rules for creating a new subscription.
 */
const createSubscriptionValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Subscription name is required'),

  body('provider')
    .trim()
    .notEmpty()
    .withMessage('Provider name is required'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  body('renewalDate')
    .notEmpty()
    .withMessage('Renewal date is required')
    .isISO8601()
    .withMessage('Renewal date must be a valid ISO8601 date'),

  body('billingCycle')
    .optional()
    .isIn(['Weekly', 'Monthly', 'Quarterly', 'Yearly'])
    .withMessage('Invalid billing cycle'),

  body('status')
    .optional()
    .isIn(['Active', 'Paused', 'Cancelled'])
    .withMessage('Invalid subscription status'),
];

/**
 * Validation rules for updating an existing subscription.
 */
const updateSubscriptionValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subscription name cannot be empty'),

  body('provider')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Provider name cannot be empty'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  body('renewalDate')
    .optional()
    .isISO8601()
    .withMessage('Renewal date must be a valid ISO8601 date'),

  body('billingCycle')
    .optional()
    .isIn(['Weekly', 'Monthly', 'Quarterly', 'Yearly'])
    .withMessage('Invalid billing cycle'),

  body('status')
    .optional()
    .isIn(['Active', 'Paused', 'Cancelled'])
    .withMessage('Invalid subscription status'),
];

module.exports = {
  createSubscriptionValidation,
  updateSubscriptionValidation,
};
