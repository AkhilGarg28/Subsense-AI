const express = require('express');
const router = express.Router();
const {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
} = require('../controllers/billController');
const { createBillValidation, updateBillValidation } = require('../utils/billValidation');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');

// All bill routes require authentication
router.use(protect);

/**
 * @route   POST /api/v1/bills
 * @desc    Create a new bill
 * @access  Private
 * 
 * @route   GET /api/v1/bills
 * @desc    Get user's bills with filtering, searching, sorting, and pagination
 * @access  Private
 */
router
  .route('/')
  .post(createBillValidation, validate, createBill)
  .get(getBills);

/**
 * @route   GET /api/v1/bills/:id
 * @desc    Get single bill by ID
 * @access  Private
 * 
 * @route   PUT /api/v1/bills/:id
 * @desc    Update existing bill
 * @access  Private
 * 
 * @route   DELETE /api/v1/bills/:id
 * @desc    Delete bill
 * @access  Private
 */
router
  .route('/:id')
  .get(getBillById)
  .put(updateBillValidation, validate, updateBill)
  .delete(deleteBill);

module.exports = router;
