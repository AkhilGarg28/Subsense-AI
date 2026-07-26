const express = require('express');
const router = express.Router();
const {
  connectGmail,
  callbackGmail,
  fetchGmailInvoices,
} = require('../controllers/gmailController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/v1/gmail/connect
 * @desc    Get OAuth2 connection URL
 * @access  Private
 */
router.get('/connect', protect, connectGmail);

/**
 * @route   GET /api/v1/gmail/callback
 * @desc    OAuth2 redirect callback handler
 * @access  Public
 */
router.get('/callback', callbackGmail);

/**
 * @route   POST /api/v1/gmail/fetch
 * @desc    Sync Gmail invoices & auto-import bills/subscriptions
 * @access  Private
 */
router.post('/fetch', protect, fetchGmailInvoices);

module.exports = router;
