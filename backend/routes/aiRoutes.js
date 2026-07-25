const express = require('express');
const router = express.Router();

/**
 * AI Routes Placeholder (Phase 6 - AI Copilot, Chat & Expense Forecasting)
 * Future Endpoints:
 * - POST /api/v1/ai/chat
 * - GET  /api/v1/ai/recommendations
 * - GET  /api/v1/ai/forecast
 */

router.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Copilot service module is ready for Phase 6 implementation.',
  });
});

module.exports = router;
