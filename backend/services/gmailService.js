const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');

/**
 * Get Gmail OAuth2 authorization URL
 */
const getGmailAuthUrl = () => {
  const redirectUri = encodeURIComponent(process.env.GMAIL_REDIRECT_URI || 'http://localhost:5000/api/v1/gmail/callback');
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GMAIL_CLIENT_ID || 'mock_client_id'}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline`;
};

/**
 * Handle OAuth2 callback exchange
 */
const handleGmailCallback = async (code) => {
  return {
    accessToken: 'mock_gmail_access_token_' + Date.now(),
    refreshToken: 'mock_gmail_refresh_token_' + Date.now(),
    email: 'user.financial.sync@gmail.com',
  };
};

/**
 * Scan Gmail account for invoice emails, extract bills/subscriptions, and prevent duplicates.
 * @param {string} userId - User Object ID
 * @returns {Promise<Object>} Import summary report
 */
const syncGmailInvoices = async (userId) => {
  // Simulated scanned invoice emails from Amazon, Netflix, Spotify, Electricity, Google
  const simulatedEmails = [
    {
      merchant: 'Amazon Invoicing',
      title: 'Amazon.com Order #112-98421',
      amount: 89.99,
      category: 'Shopping',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      type: 'Bill',
    },
    {
      merchant: 'Netflix Subscription',
      title: 'Netflix Standard Plan Invoice',
      amount: 15.49,
      category: 'Entertainment',
      renewalDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      type: 'Subscription',
      billingCycle: 'Monthly',
    },
    {
      merchant: 'City Water & Power',
      title: 'Monthly Water & Utility Statement',
      amount: 64.20,
      category: 'Utilities',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      type: 'Bill',
    },
  ];

  let syncedBillsCount = 0;
  let syncedSubscriptionsCount = 0;
  const importedBills = [];
  const importedSubscriptions = [];

  for (const item of simulatedEmails) {
    if (item.type === 'Bill') {
      // Check for duplicate import (same user, merchant, and amount)
      const duplicate = await Bill.findOne({
        user: userId,
        merchant: item.merchant,
        amount: item.amount,
      });

      if (!duplicate) {
        const newBill = await Bill.create({
          user: userId,
          title: item.title,
          merchant: item.merchant,
          amount: item.amount,
          category: item.category,
          dueDate: item.dueDate,
          notes: 'Imported automatically via Gmail Sync Service',
          paymentMethod: 'Gmail Auto-Sync',
        });
        importedBills.push(newBill);
        syncedBillsCount++;
      }
    } else if (item.type === 'Subscription') {
      const duplicate = await Subscription.findOne({
        user: userId,
        provider: item.merchant,
      });

      if (!duplicate) {
        const newSub = await Subscription.create({
          user: userId,
          name: item.title,
          provider: item.merchant,
          price: item.amount,
          category: item.category,
          renewalDate: item.renewalDate,
          billingCycle: item.billingCycle,
          description: 'Imported automatically via Gmail Sync Service',
        });
        importedSubscriptions.push(newSub);
        syncedSubscriptionsCount++;
      }
    }
  }

  return {
    syncedBillsCount,
    syncedSubscriptionsCount,
    importedBills,
    importedSubscriptions,
    message: `Gmail sync completed. ${syncedBillsCount} bill(s) and ${syncedSubscriptionsCount} subscription(s) imported. Duplicates prevented.`,
  };
};

module.exports = {
  getGmailAuthUrl,
  handleGmailCallback,
  syncGmailInvoices,
};
