/**
 * @desc    Get API health status
 * @route   GET /api/v1/health
 * @access  Public
 */
const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    status: 'running',
    version: '1.0',
    environment: process.env.NODE_ENV || 'development',
  });
};

module.exports = {
  getHealth,
};
