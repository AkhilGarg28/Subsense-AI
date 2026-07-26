const Subscription = require('../models/Subscription');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Create a new subscription
 * @route   POST /api/v1/subscriptions
 * @access  Private
 */
const createSubscription = async (req, res, next) => {
  try {
    const subscriptionData = {
      ...req.body,
      user: req.user._id,
    };

    const subscription = await Subscription.create(subscriptionData);
    return ApiResponse.send(res, 201, 'Subscription created successfully', subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user subscriptions with filtering, searching, sorting, and pagination
 * @route   GET /api/v1/subscriptions
 * @access  Private
 */
const getSubscriptions = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Parse Query Parameters
    const {
      status,
      provider,
      billingCycle,
      startDate,
      endDate,
      search,
      sort = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    const query = { user: userId };

    if (status) {
      query.status = status;
    }

    if (provider) {
      query.provider = { $regex: provider, $options: 'i' };
    }

    if (billingCycle) {
      query.billingCycle = billingCycle;
    }

    // Renewal Date Range Filter
    if (startDate || endDate) {
      query.renewalDate = {};
      if (startDate) query.renewalDate.$gte = new Date(startDate);
      if (endDate) query.renewalDate.$lte = new Date(endDate);
    }

    // Search Filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort Options
    let sortOptions = {};
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'price_asc':
        sortOptions = { price: 1 };
        break;
      case 'price_desc':
        sortOptions = { price: -1 };
        break;
      case 'renewal_date_asc':
        sortOptions = { renewalDate: 1 };
        break;
      case 'renewal_date_desc':
        sortOptions = { renewalDate: -1 };
        break;
      case 'provider':
        sortOptions = { provider: 1 };
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

    const [subscriptions, totalRecords] = await Promise.all([
      Subscription.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Subscription.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalRecords / limitNum) || 1;

    return ApiResponse.send(res, 200, 'Subscriptions retrieved successfully', {
      subscriptions,
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
 * @desc    Get single subscription by ID
 * @route   GET /api/v1/subscriptions/:id
 * @access  Private
 */
const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return next(new ApiError(404, 'Subscription not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Subscription retrieved successfully', subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update subscription
 * @route   PUT /api/v1/subscriptions/:id
 * @access  Private
 */
const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return next(new ApiError(404, 'Subscription not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Subscription updated successfully', subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete subscription
 * @route   DELETE /api/v1/subscriptions/:id
 * @access  Private
 */
const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      return next(new ApiError(404, 'Subscription not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Subscription deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Pause a subscription
 * @route   PATCH /api/v1/subscriptions/:id/pause
 * @access  Private
 */
const pauseSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { status: 'Paused' } },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return next(new ApiError(404, 'Subscription not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Subscription paused successfully', subscription);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Resume a paused subscription
 * @route   PATCH /api/v1/subscriptions/:id/resume
 * @access  Private
 */
const resumeSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { status: 'Active' } },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return next(new ApiError(404, 'Subscription not found or unauthorized'));
    }

    return ApiResponse.send(res, 200, 'Subscription resumed successfully', subscription);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  pauseSubscription,
  resumeSubscription,
};
