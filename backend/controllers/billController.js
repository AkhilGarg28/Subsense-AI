const Bill = require('../models/Bill');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Create a new bill
 * @route   POST /api/v1/bills
 * @access  Private
 */
const createBill = async (req, res, next) => {
  try {
    const billData = {
      ...req.body,
      user: req.user._id,
    };

    const bill = await Bill.create(billData);
    return ApiResponse.send(res, 201, 'Bill created successfully', bill);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all user bills with filtering, searching, sorting, and pagination
 * @route   GET /api/v1/bills
 * @access  Private
 */
const getBills = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Automatically sync overdue status for pending bills past due date
    await Bill.updateMany(
      {
        user: userId,
        status: 'Pending',
        dueDate: { $lt: new Date() },
      },
      {
        $set: { status: 'Overdue' },
      }
    );

    // Parse Query Parameters
    const {
      category,
      merchant,
      status,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      search,
      sort = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    // Build Mongoose Filter Query
    const query = { user: userId };

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (merchant) {
      query.merchant = { $regex: merchant, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    // Amount Range Filter
    if (minAmount !== undefined || maxAmount !== undefined) {
      query.amount = {};
      if (minAmount !== undefined) query.amount.$gte = Number(minAmount);
      if (maxAmount !== undefined) query.amount.$lte = Number(maxAmount);
    }

    // Date Range Filter (on dueDate)
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }

    // General Keyword Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { merchant: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort Options Mapping
    let sortOptions = {};
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'amount_asc':
        sortOptions = { amount: 1 };
        break;
      case 'amount_desc':
        sortOptions = { amount: -1 };
        break;
      case 'due_date_asc':
        sortOptions = { dueDate: 1 };
        break;
      case 'due_date_desc':
        sortOptions = { dueDate: -1 };
        break;
      case 'merchant':
        sortOptions = { merchant: 1 };
        break;
      case 'newest':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // Pagination setup
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute queries with lean for performance
    const [bills, totalRecords] = await Promise.all([
      Bill.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Bill.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalRecords / limitNum) || 1;

    return ApiResponse.send(res, 200, 'Bills retrieved successfully', {
      bills,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages,
        totalRecords,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single bill by ID
 * @route   GET /api/v1/bills/:id
 * @access  Private
 */
const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bill) {
      return next(new ApiError(404, 'Bill not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Bill retrieved successfully', bill);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing bill
 * @route   PUT /api/v1/bills/:id
 * @access  Private
 */
const updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!bill) {
      return next(new ApiError(404, 'Bill not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Bill updated successfully', bill);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete bill
 * @route   DELETE /api/v1/bills/:id
 * @access  Private
 */
const deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bill) {
      return next(new ApiError(404, 'Bill not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Bill deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload bill file (image/PDF) & process via OCR
 * @route   POST /api/v1/bills/upload (or /api/bills/upload)
 * @access  Private
 */
const uploadBill = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(400, 'Please upload a valid bill file (image or PDF)'));
    }

    const { extractOCRData } = require('../services/ocrService');
    const ocrResult = await extractOCRData(req.file.path);

    const newBill = await Bill.create({
      user: req.user._id,
      title: ocrResult.invoiceNumber ? `Invoice #${ocrResult.invoiceNumber}` : `${ocrResult.merchant} Bill`,
      merchant: ocrResult.merchant,
      category: ocrResult.category,
      amount: ocrResult.amount,
      currency: ocrResult.currency || 'USD',
      dueDate: ocrResult.dueDate,
      status: 'Pending',
      paymentMethod: ocrResult.paymentMethod || 'Credit Card',
      ocrText: ocrResult.ocrText,
      billImage: req.file.path,
      notes: `Uploaded file: ${req.file.originalname}`,
    });

    return ApiResponse.send(res, 201, 'Bill file uploaded and parsed via OCR successfully', {
      bill: newBill,
      ocrExtractedData: ocrResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
  uploadBill,
};

