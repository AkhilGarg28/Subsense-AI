const path = require('path');
const Bill = require('../models/Bill');
const { extractOCRData } = require('../services/ocrService');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Extract bill details from uploaded receipt image/PDF & auto-create Bill record
 * @route   POST /api/v1/ocr/extract
 * @access  Private
 */
const extractOCR = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(400, 'Please upload a receipt image or PDF file'));
    }

    const filePath = req.file.path;
    const extractedData = await extractOCRData(filePath);

    const relativeImagePath = `/uploads/${path.basename(filePath)}`;

    // Automatically create a Bill record from extracted OCR data
    const bill = await Bill.create({
      user: req.user._id,
      title: `${extractedData.merchant} Invoice`,
      merchant: extractedData.merchant,
      amount: extractedData.amount,
      currency: extractedData.currency,
      dueDate: extractedData.dueDate,
      billDate: extractedData.billDate,
      category: extractedData.category,
      paymentMethod: extractedData.paymentMethod,
      status: 'Pending',
      notes: `Extracted automatically via SubSense AI OCR Engine (Invoice #${extractedData.invoiceNumber})`,
      billImage: relativeImagePath,
      ocrText: extractedData.ocrText,
    });

    return ApiResponse.send(res, 201, 'OCR processing complete. Bill record created automatically.', {
      bill,
      extractedData: {
        merchant: extractedData.merchant,
        amount: extractedData.amount,
        currency: extractedData.currency,
        tax: extractedData.tax,
        invoiceNumber: extractedData.invoiceNumber,
        category: extractedData.category,
        confidenceScore: extractedData.confidenceScore,
        billImage: relativeImagePath,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  extractOCR,
};
