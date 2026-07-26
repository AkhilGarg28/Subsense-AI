/**
 * Role-based authorization middleware generator.
 * @param {...string} roles - Permitted roles (e.g. 'Admin', 'User')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required prior to authorization check.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' does not have permission to access this resource.`,
      });
    }

    next();
  };
};

module.exports = authorize;
