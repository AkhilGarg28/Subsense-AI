const { body } = require('express-validator');

/**
 * Validation rules for creating a new bill.
 */
const createBillValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Bill title is required'),

  body('merchant')
    .trim()
    .notEmpty()
    .withMessage('Merchant name is required'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),

  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date'),

  body('status')
    .optional()
    .isIn(['Pending', 'Paid', 'Overdue', 'Cancelled'])
    .withMessage('Invalid bill status'),

  body('billDate')
    .optional()
    .isISO8601()
    .withMessage('Bill date must be a valid ISO8601 date'),
];

/**
 * Validation rules for updating an existing bill.
 */
const updateBillValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Bill title cannot be empty'),

  body('merchant')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Merchant name cannot be empty'),

  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date'),

  body('status')
    .optional()
    .isIn(['Pending', 'Paid', 'Overdue', 'Cancelled'])
    .withMessage('Invalid bill status'),
];

module.exports = {
  createBillValidation,
  updateBillValidation,
};
