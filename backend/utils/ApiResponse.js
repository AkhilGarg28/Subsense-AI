/**
 * Standardized API Response Wrapper Class
 * Ensures consistent JSON responses across all controllers.
 */
class ApiResponse {
  constructor(statusCode, data, message = 'Success', extra = {}) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    
    if (data !== undefined && data !== null) {
      this.data = data;
    }

    Object.assign(this, extra);
  }

  /**
   * Static helper method to send standardized JSON responses.
   * @param {Object} res - Express Response object
   * @param {number} statusCode - HTTP Status code (200, 201, etc.)
   * @param {string} message - Response message
   * @param {Object} [data] - Main payload data
   * @param {Object} [extra] - Additional top-level fields (e.g., token, user)
   */
  static send(res, statusCode, message, data = undefined, extra = {}) {
    const payload = {
      success: true,
      message,
      ...(data !== undefined && { data }),
      ...extra,
    };
    return res.status(statusCode).json(payload);
  }
}

module.exports = ApiResponse;
