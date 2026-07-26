const express = require('express');
const router = express.Router();
const { getForecast } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Forecast route requires authentication
router.use(protect);

/**
 * @route   GET /api/forecast or /api/v1/forecast
 * @desc    Predict upcoming next-month, 90-day expenses, subscriptions, and savings
 * @access  Private
 */
router.get('/', getForecast);

module.exports = router;
