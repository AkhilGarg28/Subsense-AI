const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');

/**
 * Calculate multi-factor Financial Health Score (0-100) for a user.
 * @param {string} userId - User Object ID
 * @returns {Promise<Object>} Detailed Financial Health Analysis payload
 */
const calculateHealthScore = async (userId) => {
  const [bills, subscriptions] = await Promise.all([
    Bill.find({ user: userId }).lean(),
    Subscription.find({ user: userId }).lean(),
  ]);

  let baseScore = 85;

  const totalBills = bills.length;
  const overdueCount = bills.filter((b) => b.status === 'Overdue').length;
  const pendingCount = bills.filter((b) => b.status === 'Pending').length;
  const paidCount = bills.filter((b) => b.status === 'Paid').length;
  const activeSubsCount = subscriptions.filter((s) => s.status === 'Active').length;

  // 1. Overdue Penalty (-15 per overdue bill)
  const overduePenalty = overdueCount * 15;
  baseScore -= overduePenalty;

  // 2. Pending Penalty (-3 per pending bill)
  const pendingPenalty = pendingCount * 3;
  baseScore -= pendingPenalty;

  // 3. Subscription Density Penalty (-3 for each active sub above 3)
  const subscriptionPenalty = activeSubsCount > 3 ? (activeSubsCount - 3) * 3 : 0;
  baseScore -= subscriptionPenalty;

  // 4. Paid Bill Ratio Bonus (+15 if paid ratio > 80%)
  const paidRatio = totalBills > 0 ? paidCount / totalBills : 1;
  let paidBonus = 0;
  if (paidRatio >= 0.8) paidBonus = 15;
  else if (paidRatio >= 0.5) paidBonus = 8;
  baseScore += paidBonus;

  // Clamp score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));

  // Determine Letter Grade & Status
  let grade = 'A';
  let status = 'Excellent';

  if (finalScore >= 90) {
    grade = 'A+';
    status = 'Outstanding';
  } else if (finalScore >= 80) {
    grade = 'A';
    status = 'Excellent';
  } else if (finalScore >= 70) {
    grade = 'B';
    status = 'Good';
  } else if (finalScore >= 60) {
    grade = 'C';
    status = 'Fair';
  } else if (finalScore >= 50) {
    grade = 'D';
    status = 'Needs Attention';
  } else {
    grade = 'F';
    status = 'Critical';
  }

  // Generate Personalized Recommendations
  const suggestions = [];
  if (overdueCount > 0) {
    suggestions.push(`Pay ${overdueCount} overdue bill(s) immediately to avoid late fees and boost your score by +${overdueCount * 15} pts.`);
  }
  if (activeSubsCount > 3) {
    suggestions.push(`Review your ${activeSubsCount} active subscriptions; canceling unused ones saves money and improves cash flow.`);
  }
  if (pendingCount > 0) {
    suggestions.push(`Set up auto-pay for your ${pendingCount} upcoming pending bill(s).`);
  }
  if (suggestions.length === 0) {
    suggestions.push('Great job! Your financial bill hygiene is excellent.');
  }

  return {
    score: finalScore,
    grade,
    status,
    explanation: `Your financial health score is ${finalScore}/100 (${grade}). ${overdueCount > 0 ? `You have ${overdueCount} overdue bill(s).` : 'No overdue bills detected.'}`,
    metrics: {
      totalBills,
      paidCount,
      pendingCount,
      overdueCount,
      activeSubscriptionsCount: activeSubsCount,
      paidRatioPercentage: Math.round(paidRatio * 100),
    },
    suggestions,
  };
};

module.exports = {
  calculateHealthScore,
};
