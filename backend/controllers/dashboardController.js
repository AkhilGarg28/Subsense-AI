const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');
const { calculateHealthScore } = require('../services/healthScoreService');
const { generateExpenseForecast } = require('../services/forecastService');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get dashboard metrics overview
 * @route   GET /api/v1/dashboard
 * @access  Private
 */
const getDashboardOverview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Auto-update overdue status
    await Bill.updateMany(
      {
        user: userId,
        status: 'Pending',
        dueDate: { $lt: now },
      },
      {
        $set: { status: 'Overdue' },
      }
    );

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [
      totalBills,
      pendingBills,
      paidBills,
      overdueBills,
      upcomingBills,
      currentMonthBillsSum,
      totalActiveSubscriptions,
      upcomingRenewals,
      recentBills,
    ] = await Promise.all([
      Bill.countDocuments({ user: userId }),
      Bill.countDocuments({ user: userId, status: 'Pending' }),
      Bill.countDocuments({ user: userId, status: 'Paid' }),
      Bill.countDocuments({ user: userId, status: 'Overdue' }),
      Bill.find({
        user: userId,
        status: { $in: ['Pending', 'Overdue'] },
        dueDate: { $gte: now, $lte: next7Days },
      })
        .sort({ dueDate: 1 })
        .lean(),
      Bill.aggregate([
        {
          $match: {
            user: userId,
            status: { $in: ['Paid', 'Pending'] },
            dueDate: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' },
          },
        },
      ]),
      Subscription.countDocuments({ user: userId, status: 'Active' }),
      Subscription.find({
        user: userId,
        status: 'Active',
        renewalDate: { $gte: now, $lte: next7Days },
      })
        .sort({ renewalDate: 1 })
        .lean(),
      Bill.find({ user: userId }).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalMonthlyExpense = currentMonthBillsSum.length > 0 ? currentMonthBillsSum[0].total : 0;

    return ApiResponse.send(res, 200, 'Dashboard overview retrieved successfully', {
      metrics: {
        totalBills,
        pendingBills,
        paidBills,
        overdueBills,
        upcomingBillsCount: upcomingBills.length,
        totalMonthlyExpense,
        totalActiveSubscriptions,
        upcomingRenewalsCount: upcomingRenewals.length,
      },
      upcomingBills,
      upcomingRenewals,
      recentBills,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get detailed financial summary analytics via MongoDB Aggregations
 * @route   GET /api/v1/dashboard/summary
 * @access  Private
 */
const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const monthlySpendingPipeline = [
      {
        $match: {
          user: userId,
          status: { $ne: 'Cancelled' },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$dueDate' },
            month: { $month: '$dueDate' },
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ];

    const categorySpendingPipeline = [
      {
        $match: {
          user: userId,
          status: { $ne: 'Cancelled' },
        },
      },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
    ];

    const topMerchantsPipeline = [
      {
        $match: {
          user: userId,
          status: { $ne: 'Cancelled' },
        },
      },
      {
        $group: {
          _id: '$merchant',
          totalAmount: { $sum: '$amount' },
          billCount: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 5 },
    ];

    const [monthlySpendingRaw, categoryWiseSpendingRaw, topMerchantsRaw, largestExpense] =
      await Promise.all([
        Bill.aggregate(monthlySpendingPipeline),
        Bill.aggregate(categorySpendingPipeline),
        Bill.aggregate(topMerchantsPipeline),
        Bill.findOne({ user: userId, status: { $ne: 'Cancelled' } })
          .sort({ amount: -1 })
          .lean(),
      ]);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthlySpending = monthlySpendingRaw.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      year: item._id.year,
      monthNumber: item._id.month,
      totalAmount: item.totalAmount,
      count: item.count,
    }));

    const categoryWiseSpending = categoryWiseSpendingRaw.map((item) => ({
      category: item._id || 'Uncategorized',
      totalAmount: item.totalAmount,
      count: item.count,
    }));

    const topMerchants = topMerchantsRaw.map((item) => ({
      merchant: item._id,
      totalAmount: item.totalAmount,
      billCount: item.billCount,
    }));

    const totalSpentAllTime = monthlySpending.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const activeMonthsCount = monthlySpending.length || 1;
    const averageMonthlyExpense = Math.round((totalSpentAllTime / activeMonthsCount) * 100) / 100;

    return ApiResponse.send(res, 200, 'Financial summary analytics retrieved successfully', {
      summary: {
        totalSpentAllTime,
        activeMonthsCount,
        averageMonthlyExpense,
        largestExpense: largestExpense
          ? {
              id: largestExpense._id,
              title: largestExpense.title,
              merchant: largestExpense.merchant,
              amount: largestExpense.amount,
              category: largestExpense.category,
              dueDate: largestExpense.dueDate,
            }
          : null,
      },
      monthlySpending,
      categoryWiseSpending,
      topMerchants,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Financial Health Score & Suggestions
 * @route   GET /api/v1/dashboard/health-score
 * @access  Private
 */
const getHealthScore = async (req, res, next) => {
  try {
    const healthAnalysis = await calculateHealthScore(req.user._id);
    return ApiResponse.send(res, 200, 'Financial Health Score calculated successfully', healthAnalysis);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Expense Forecast for next week, month, quarter
 * @route   GET /api/v1/dashboard/forecast
 * @access  Private
 */
const getForecast = async (req, res, next) => {
  try {
    const forecast = await generateExpenseForecast(req.user._id);
    return ApiResponse.send(res, 200, 'Expense Forecast generated successfully', forecast);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardOverview,
  getDashboardSummary,
  getHealthScore,
  getForecast,
};
