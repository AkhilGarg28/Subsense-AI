const { getGmailAuthUrl, handleGmailCallback, syncGmailInvoices } = require('../services/gmailService');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get Gmail OAuth2 authorization connect URL
 * @route   GET /api/v1/gmail/connect
 * @access  Private
 */
const connectGmail = async (req, res, next) => {
  try {
    const authUrl = getGmailAuthUrl();
    return ApiResponse.send(res, 200, 'Gmail authorization URL generated', { authUrl });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Handle Gmail OAuth2 callback
 * @route   GET /api/v1/gmail/callback
 * @access  Public
 */
const callbackGmail = async (req, res, next) => {
  try {
    const { code } = req.query;
    const tokenData = await handleGmailCallback(code);
    return ApiResponse.send(res, 200, 'Gmail authorization successful', tokenData);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Sync Gmail inbox to import invoice bills & subscriptions
 * @route   POST /api/v1/gmail/fetch
 * @access  Private
 */
const fetchGmailInvoices = async (req, res, next) => {
  try {
    const syncResult = await syncGmailInvoices(req.user._id);
    return ApiResponse.send(res, 200, syncResult.message, syncResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  connectGmail,
  callbackGmail,
  fetchGmailInvoices,
};
