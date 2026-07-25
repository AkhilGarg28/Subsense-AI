const jwt = require('jsonwebtoken');

/**
 * Generate JWT token containing user id, email, and role.
 * @param {Object} payload - User identification details { id, email, role }
 * @returns {string} Signed JWT token string
 */
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_subsense_ai';
  const expiresIn = process.env.JWT_EXPIRE || '30d';

  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    },
    secret,
    { expiresIn }
  );
};

module.exports = generateToken;
