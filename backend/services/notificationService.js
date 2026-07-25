const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const { calculateHealthScore } = require('./healthScoreService');

/**
 * Scan user financial status and generate smart notifications.
 * @param {string} userId - User Object ID
 * @returns {Promise<Array>} Array of generated notifications
 */
const generateNotificationsForUser = async (userId) => {
  const now = new Date();
  const next5Days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

  const [bills, subscriptions, healthAnalysis] = await Promise.all([
    Bill.find({ user: userId }).lean(),
    Subscription.find({ user: userId, status: 'Active' }).lean(),
    calculateHealthScore(userId),
  ]);

  const generatedNotifications = [];

  // 1. Overdue Bills Warning
  const overdueBills = bills.filter((b) => b.status === 'Overdue');
  for (const bill of overdueBills) {
    const existing = await Notification.findOne({
      user: userId,
      title: `Overdue Bill: ${bill.title}`,
      read: false,
    });

    if (!existing) {
      const notif = await Notification.create({
        user: userId,
        title: `Overdue Bill: ${bill.title}`,
        message: `Your bill for ${bill.merchant} ($${bill.amount.toFixed(2)}) is overdue! Pay now to prevent penalty fees.`,
        type: 'Bill',
        priority: 'High',
      });
      generatedNotifications.push(notif);
    }
  }

  // 2. Upcoming Bills (Due in next 5 days)
  const upcomingBills = bills.filter(
    (b) => b.status === 'Pending' && new Date(b.dueDate) >= now && new Date(b.dueDate) <= next5Days
  );

  for (const bill of upcomingBills) {
    const existing = await Notification.findOne({
      user: userId,
      title: `Upcoming Bill Due: ${bill.title}`,
      read: false,
    });

    if (!existing) {
      const notif = await Notification.create({
        user: userId,
        title: `Upcoming Bill Due: ${bill.title}`,
        message: `Reminder: Your ${bill.merchant} bill ($${bill.amount.toFixed(2)}) is due on ${new Date(bill.dueDate).toLocaleDateString()}.`,
        type: 'Bill',
        priority: 'Medium',
      });
      generatedNotifications.push(notif);
    }
  }

  // 3. Subscription Renewals (Renewing in next 5 days)
  const upcomingSubs = subscriptions.filter(
    (s) => new Date(s.renewalDate) >= now && new Date(s.renewalDate) <= next5Days
  );

  for (const sub of upcomingSubs) {
    const existing = await Notification.findOne({
      user: userId,
      title: `Subscription Renewal: ${sub.name}`,
      read: false,
    });

    if (!existing) {
      const notif = await Notification.create({
        user: userId,
        title: `Subscription Renewal: ${sub.name}`,
        message: `Your ${sub.provider} subscription ($${sub.price.toFixed(2)}/${sub.billingCycle.toLowerCase()}) renews on ${new Date(sub.renewalDate).toLocaleDateString()}.`,
        type: 'Subscription',
        priority: 'Medium',
      });
      generatedNotifications.push(notif);
    }
  }

  // 4. Low Health Score Alert
  if (healthAnalysis.score < 60) {
    const existing = await Notification.findOne({
      user: userId,
      title: 'Low Financial Health Alert',
      read: false,
    });

    if (!existing) {
      const notif = await Notification.create({
        user: userId,
        title: 'Low Financial Health Alert',
        message: `Your Financial Health Score dropped to ${healthAnalysis.score}/100 (${healthAnalysis.grade}). Check your dashboard recommendations.`,
        type: 'AI',
        priority: 'High',
      });
      generatedNotifications.push(notif);
    }
  }

  return generatedNotifications;
};

module.exports = {
  generateNotificationsForUser,
};
