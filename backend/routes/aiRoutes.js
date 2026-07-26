const express = require('express');
const router = express.Router();
const { analyzeSpending, askAIChat } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// All AI routes require authentication
router.use(protect);

/**
 * @route   POST /api/v1/ai/analyze
 * @desc    Analyze user financial spending, trends, duplicate subscriptions, and risk alerts
 * @access  Private
 */
router.post('/analyze', analyzeSpending);

/**
 * @route   POST /api/v1/ai/chat
 * @desc    Conversational AI Financial Assistant Chatbot
 * @access  Private
 */
router.post('/chat', askAIChat);

module.exports = router;
