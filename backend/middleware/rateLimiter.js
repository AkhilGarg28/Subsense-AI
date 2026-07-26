const rateLimit = require('express-rate-limit');

/**
 * Rate Limiting Middleware to protect API endpoints against abuse and brute-force attacks.
 * Allows 100 requests per 15-minute window per IP.
 */
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
    error: 'Too Many Requests',
  },
});

module.exports = apiRateLimiter;
