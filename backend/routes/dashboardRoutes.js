const express = require('express');
const router = express.Router();
const {
  getDashboardOverview,
  getDashboardSummary,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// All dashboard routes require authentication
router.use(protect);

/**
 * @route   GET /api/v1/dashboard
 * @desc    Get dashboard metrics overview (totals, status breakdown, 7-day upcoming)
 * @access  Private
 */
router.get('/', getDashboardOverview);

/**
 * @route   GET /api/v1/dashboard/summary
 * @desc    Get detailed financial summary analytics via MongoDB Aggregation Pipelines
 * @access  Private
 */
router.get('/summary', getDashboardSummary);

module.exports = router;
