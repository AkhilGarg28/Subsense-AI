const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');

/**
 * Generate predictive expense forecast for Next Week, Next Month, and Next Quarter.
 * @param {string} userId - User Object ID
 * @returns {Promise<Object>} Expense forecast predictions & insights
 */
const generateExpenseForecast = async (userId) => {
  const now = new Date();
  const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const next30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const next90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const [bills, subscriptions] = await Promise.all([
    Bill.find({ user: userId, status: { $ne: 'Cancelled' } }).lean(),
    Subscription.find({ user: userId, status: 'Active' }).lean(),
  ]);

  // 1. Next Week Forecast
  const weekBills = bills.filter((b) => new Date(b.dueDate) >= now && new Date(b.dueDate) <= next7Days);
  const weekSubs = subscriptions.filter((s) => new Date(s.renewalDate) >= now && new Date(s.renewalDate) <= next7Days);

  const weekBillsTotal = weekBills.reduce((acc, curr) => acc + curr.amount, 0);
  const weekSubsTotal = weekSubs.reduce((acc, curr) => acc + curr.price, 0);
  const nextWeekTotal = Math.round((weekBillsTotal + weekSubsTotal) * 100) / 100;

  // 2. Next Month Forecast
  const monthBills = bills.filter((b) => new Date(b.dueDate) >= now && new Date(b.dueDate) <= next30Days);
  const monthSubs = subscriptions.filter((s) => new Date(s.renewalDate) >= now && new Date(s.renewalDate) <= next30Days);

  const monthBillsTotal = monthBills.reduce((acc, curr) => acc + curr.amount, 0);
  const monthSubsTotal = monthSubs.reduce((acc, curr) => acc + curr.price, 0);
  const nextMonthTotal = Math.round((monthBillsTotal + monthSubsTotal) * 100) / 100;

  // 3. Next Quarter Forecast (3 months)
  const quarterBills = bills.filter((b) => new Date(b.dueDate) >= now && new Date(b.dueDate) <= next90Days);
  const quarterSubsTotal = subscriptions.reduce((acc, curr) => {
    let multiplier = 3; // default monthly -> 3 times per quarter
    if (curr.billingCycle === 'Weekly') multiplier = 12;
    if (curr.billingCycle === 'Quarterly') multiplier = 1;
    if (curr.billingCycle === 'Yearly') multiplier = 0.25;
    return acc + curr.price * multiplier;
  }, 0);

  const quarterBillsTotal = quarterBills.reduce((acc, curr) => acc + curr.amount, 0);
  const nextQuarterTotal = Math.round((quarterBillsTotal + quarterSubsTotal) * 100) / 100;

  // Predictive Insights
  const insights = [
    `Projected spending for next week is $${nextWeekTotal.toFixed(2)}.`,
    `Projected spending for next month is $${nextMonthTotal.toFixed(2)} (${monthBills.length} bill(s) and ${monthSubs.length} subscription renewal(s)).`,
    `Estimated 90-day cash outflow is $${nextQuarterTotal.toFixed(2)}.`,
  ];

  return {
    nextWeek: {
      estimatedBills: Math.round(weekBillsTotal * 100) / 100,
      subscriptionRenewals: Math.round(weekSubsTotal * 100) / 100,
      totalForecast: nextWeekTotal,
      billCount: weekBills.length,
      subscriptionCount: weekSubs.length,
    },
    nextMonth: {
      estimatedBills: Math.round(monthBillsTotal * 100) / 100,
      subscriptionRenewals: Math.round(monthSubsTotal * 100) / 100,
      totalForecast: nextMonthTotal,
      billCount: monthBills.length,
      subscriptionCount: monthSubs.length,
    },
    nextQuarter: {
      estimatedBills: Math.round(quarterBillsTotal * 100) / 100,
      subscriptionRenewals: Math.round(quarterSubsTotal * 100) / 100,
      totalForecast: nextQuarterTotal,
    },
    insights,
  };
};

module.exports = {
  generateExpenseForecast,
};
