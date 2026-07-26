const express = require('express');
const router = express.Router();
const { getHealthScore } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Health Score route requires authentication
router.use(protect);

/**
 * @route   GET /api/health-score or /api/v1/health-score
 * @desc    Calculate and retrieve user financial health score & recommendations
 * @access  Private
 */
router.get('/', getHealthScore);

module.exports = router;
