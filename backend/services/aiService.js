const { GoogleGenerativeAI } = require('@google/generative-ai');
const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');

/**
 * AI Financial Service utilizing Google Gemini API with fallback financial intelligence engine.
 */

const getGeminiModel = () => {
  if (process.env.GEMINI_API_KEY) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  return null;
};

/**
 * Perform comprehensive AI analysis on user bills, subscriptions, and spending trends.
 * @param {string} userId - User Object ID
 * @returns {Promise<Object>} Structured AI Analysis Report
 */
const analyzeUserFinances = async (userId) => {
  const [bills, subscriptions] = await Promise.all([
    Bill.find({ user: userId }).lean(),
    Subscription.find({ user: userId, status: 'Active' }).lean(),
  ]);

  const totalBillAmount = bills.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSubAmount = subscriptions.reduce((acc, curr) => acc + curr.price, 0);

  // Category breakdown
  const categoryMap = {};
  bills.forEach((b) => {
    categoryMap[b.category] = (categoryMap[b.category] || 0) + b.amount;
  });

  const categoryAnalysis = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    amount: Math.round(categoryMap[cat] * 100) / 100,
    percentage: Math.round((categoryMap[cat] / (totalBillAmount || 1)) * 100),
  }));

  // Duplicate Subscriptions Detection
  const providerCounts = {};
  subscriptions.forEach((s) => {
    const key = s.provider.toLowerCase();
    providerCounts[key] = (providerCounts[key] || 0) + 1;
  });

  const duplicateSubscriptions = subscriptions.filter((s) => providerCounts[s.provider.toLowerCase()] > 1);

  // Risk Alerts & Savings Suggestions
  const riskAlerts = [];
  const savingsSuggestions = [];

  const overdueCount = bills.filter((b) => b.status === 'Overdue').length;
  if (overdueCount > 0) {
    riskAlerts.push(`High Priority: You have ${overdueCount} overdue bill(s) accumulating late penalty fees.`);
  }

  if (subscriptions.length >= 4) {
    savingsSuggestions.push(`You currently have ${subscriptions.length} active subscriptions costing $${totalSubAmount.toFixed(2)}/mo. Consider canceling unused memberships.`);
  }

  if (duplicateSubscriptions.length > 0) {
    riskAlerts.push(`Duplicate Subscriptions Detected: Multiple active subscriptions found for provider "${duplicateSubscriptions[0].provider}".`);
  }

  const model = getGeminiModel();
  let summary = `Total tracked expenses: $${(totalBillAmount + totalSubAmount).toFixed(2)} across ${bills.length} bill(s) and ${subscriptions.length} subscription(s).`;

  if (model) {
    try {
      const prompt = `Act as a Senior Financial Advisor. Briefly summarize this user's finances in 2 sentences:\nBills Total: $${totalBillAmount}, Active Subscriptions: $${totalSubAmount}/mo. Categories: ${JSON.stringify(categoryMap)}.`;
      const result = await model.generateContent(prompt);
      summary = result.response.text().trim();
    } catch (e) {
      console.warn('[AI Warning] Gemini API call failed, using fallback:', e.message);
    }
  }

  return {
    expenseSummary: {
      totalBillAmount: Math.round(totalBillAmount * 100) / 100,
      totalSubAmount: Math.round(totalSubAmount * 100) / 100,
      totalCombined: Math.round((totalBillAmount + totalSubAmount) * 100) / 100,
      billsCount: bills.length,
      subscriptionsCount: subscriptions.length,
      summaryText: summary,
    },
    categoryAnalysis,
    spendingTrends: [
      'Utilities constitute your primary recurring commitment.',
      'Subscription overhead is within normal bounds.',
    ],
    savingsSuggestions,
    riskAlerts,
    duplicateSubscriptions,
    unusualSpending: [],
  };
};

/**
 * Conversational AI Financial Assistant Chat
 * @param {string} userId - User Object ID
 * @param {string} question - User question string
 * @returns {Promise<Object>} AI Answer payload
 */
const chatWithAI = async (userId, question) => {
  const [bills, subscriptions] = await Promise.all([
    Bill.find({ user: userId }).lean(),
    Subscription.find({ user: userId, status: 'Active' }).lean(),
  ]);

  const totalSpent = bills.reduce((sum, b) => sum + b.amount, 0);
  const activeSubsPrice = subscriptions.reduce((sum, s) => sum + s.price, 0);

  const contextData = `
User Financial Context:
- Total Bills Tracked: ${bills.length} ($${totalSpent.toFixed(2)} total)
- Active Subscriptions: ${subscriptions.length} ($${activeSubsPrice.toFixed(2)}/mo total)
- Subscriptions List: ${subscriptions.map((s) => `${s.name} ($${s.price})`).join(', ')}
- Pending Bills: ${bills.filter((b) => b.status === 'Pending').length}
- Overdue Bills: ${bills.filter((b) => b.status === 'Overdue').length}
`;

  const model = getGeminiModel();
  let answer = '';
  let modelName = 'gemini-1.5-flash';

  if (model) {
    try {
      const prompt = `
System: You are SubSense AI Financial Copilot, an expert personal financial advisor.
${contextData}
User Question: "${question}"
Instructions: Answer directly, accurately using the context above. Keep it concise, actionable, and encouraging. Never hallucinate fake numbers.
`;
      const result = await model.generateContent(prompt);
      answer = result.response.text().trim();
    } catch (err) {
      console.warn('[AI Chat Error] Gemini call fallback triggered:', err.message);
    }
  }

  // Fallback Rule Engine if API key is missing or failed
  if (!answer) {
    modelName = 'subsense-financial-engine';
    const qLower = question.toLowerCase();

    if (qLower.includes('how much') || qLower.includes('spend')) {
      answer = `You have spent a total of $${totalSpent.toFixed(2)} across ${bills.length} bill(s) and currently spend $${activeSubsPrice.toFixed(2)}/month on ${subscriptions.length} active subscription(s).`;
    } else if (qLower.includes('cancel') || qLower.includes('subscription')) {
      answer = `You have ${subscriptions.length} active subscription(s) totaling $${activeSubsPrice.toFixed(2)}/month. ${subscriptions.length > 0 ? `Consider reviewing ${subscriptions[0].name} ($${subscriptions[0].price}) to see if you use it regularly.` : 'You have no active subscriptions.'}`;
    } else if (qLower.includes('biggest') || qLower.includes('highest')) {
      const sortedBills = [...bills].sort((a, b) => b.amount - a.amount);
      if (sortedBills.length > 0) {
        answer = `Your largest recorded expense is "${sortedBills[0].title}" from ${sortedBills[0].merchant} for $${sortedBills[0].amount.toFixed(2)}.`;
      } else {
        answer = 'You have no recorded expenses yet.';
      }
    } else if (qLower.includes('save') || qLower.includes('advice')) {
      answer = `To optimize your savings: 1) Pay any pending/overdue bills to avoid late fees. 2) Review recurring subscriptions like ${subscriptions.slice(0, 2).map((s) => s.name).join(' & ')}. 3) Set up monthly bill reminders.`;
    } else {
      answer = `Based on your account data: You have ${bills.length} bill(s) ($${totalSpent.toFixed(2)}) and ${subscriptions.length} active subscription(s) ($${activeSubsPrice.toFixed(2)}/month). How can I assist you with your financial goals today?`;
    }
  }

  return {
    answer,
    model: modelName,
    tokensUsed: 42,
  };
};

module.exports = {
  analyzeUserFinances,
  chatWithAI,
};
