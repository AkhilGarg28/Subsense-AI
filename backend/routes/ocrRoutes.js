const express = require('express');
const router = express.Router();
const { extractOCR } = require('../controllers/ocrController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All OCR routes require authentication
router.use(protect);

/**
 * @route   POST /api/v1/ocr/extract
 * @desc    Upload image/PDF receipt, run OCR extraction, & auto-create Bill
 * @access  Private
 */
router.post('/extract', (req, res, next) => {
  // Support both 'receipt' and 'file' field names in form-data
  upload.single('receipt')(req, res, (err) => {
    if (err) {
      return upload.single('file')(req, res, next);
    }
    next();
  });
}, extractOCR);

module.exports = router;
