const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/healthController');

/**
 * @route GET /api/v1/health
 * @desc  System health check endpoint
 */
router.get('/', getHealth);

module.exports = router;
