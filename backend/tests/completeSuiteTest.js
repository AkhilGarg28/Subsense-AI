const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Load environment variables relative to this test file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('../app');
const User = require('../models/User');
const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');

const TEST_MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/subsense_ai_complete_test';

const runCompleteSuite = async () => {
  console.log('====================================================');
  console.log(' SubSense AI - Comprehensive Backend Integration Test');
  console.log('====================================================\n');

  try {
    await mongoose.connect(TEST_MONGO_URI);
    console.log('[DB] Connected to test database.');
  } catch (dbErr) {
    console.error('[DB Error] Failed to connect to MongoDB:', dbErr.message);
    process.exit(1);
  }

  // Cleanup test user accounts
  const testEmail = 'complete.test@subsense.ai';
  const googleEmail = 'google.user@subsense.ai';

  const existingUsers = await User.find({ email: { $in: [testEmail, googleEmail] } });
  const userIds = existingUsers.map((u) => u._id);

  await Promise.all([
    User.deleteMany({ email: { $in: [testEmail, googleEmail] } }),
    Bill.deleteMany({ user: { $in: userIds } }),
    Subscription.deleteMany({ user: { $in: userIds } }),
    Notification.deleteMany({ user: { $in: userIds } }),
  ]);

  const server = app.listen(0);
  const port = server.address().port;

  const request = (method, path, body = null, token = null) => {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options = {
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers,
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(responseData);
          } catch (e) {
            parsed = responseData;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      });

      req.on('error', reject);
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  };

  let testCount = 0;
  let passedCount = 0;

  const assert = (description, condition, details = '') => {
    testCount++;
    if (condition) {
      passedCount++;
      console.log(` ✓ [PASS] ${description}`);
    } else {
      console.error(` ✗ [FAIL] ${description} ${details}`);
    }
  };

  let userToken = '';
  let billId = '';
  let subscriptionId = '';
  let notificationId = '';

  try {
    // 1. Health Check
    const healthRes = await request('GET', '/api/v1/health');
    assert('1. GET /api/v1/health system status OK', healthRes.status === 200 && healthRes.body.success === true);

    // 2. Auth Signup
    const signupRes = await request('POST', '/api/v1/auth/signup', {
      name: 'Full Suite Tester',
      email: testEmail,
      password: 'Password123!',
    });
    assert('2. POST /api/v1/auth/signup user creation', signupRes.status === 201 && !!signupRes.body.token);
    userToken = signupRes.body.token;

    // 3. Auth Login
    const loginRes = await request('POST', '/api/v1/auth/login', {
      email: testEmail,
      password: 'Password123!',
    });
    assert('3. POST /api/v1/auth/login successful', loginRes.status === 200 && loginRes.body.success === true);

    // 4. Google OAuth Backend Login/Register
    const googleRes = await request('POST', '/api/auth/google', {
      email: googleEmail,
      name: 'Google Auth Tester',
      googleId: 'g_test_id_99',
    });
    assert('4. POST /api/auth/google OAuth backend handler', googleRes.status === 200 && googleRes.body.success === true);

    // 5. Forgot Password Request
    const forgotRes = await request('POST', '/api/auth/forgot-password', { email: testEmail });
    assert('5. POST /api/auth/forgot-password token generation', forgotRes.status === 200 && !!forgotRes.body.data.resetToken);

    // 6. User Profile GET
    const profileRes = await request('GET', '/api/user/profile', null, userToken);
    assert('6. GET /api/user/profile retrieves authenticated profile', profileRes.status === 200 && profileRes.body.data.email === testEmail);

    // 7. User Profile PUT Update
    const updateProfileRes = await request('PUT', '/api/user/profile', { name: 'Full Suite Updated' }, userToken);
    assert('7. PUT /api/user/profile updates name', updateProfileRes.status === 200 && updateProfileRes.body.data.name === 'Full Suite Updated');

    // 8. User Password Change
    const changePassRes = await request('PUT', '/api/user/password', {
      currentPassword: 'Password123!',
      newPassword: 'NewPassword123!',
    }, userToken);
    assert('8. PUT /api/user/password updates password', changePassRes.status === 200 && changePassRes.body.success === true);

    // Re-login with new password
    const reloginRes = await request('POST', '/api/v1/auth/login', {
      email: testEmail,
      password: 'NewPassword123!',
    });
    userToken = reloginRes.body.token;

    // 9. Bills POST Create
    const createBillRes = await request('POST', '/api/bills', {
      title: 'Power & Utility Invoice',
      merchant: 'City Energy',
      category: 'Utilities',
      amount: 140.75,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }, userToken);
    assert('9. POST /api/bills creates bill record', createBillRes.status === 201 && createBillRes.body.data.merchant === 'City Energy');
    billId = createBillRes.body.data._id;

    // 10. Bills GET List
    const getBillsRes = await request('GET', '/api/bills?category=Utilities', null, userToken);
    assert('10. GET /api/bills retrieves user bills', getBillsRes.status === 200 && getBillsRes.body.data.bills.length >= 1);

    // 11. Bills GET by ID
    const getBillIdRes = await request('GET', `/api/bills/${billId}`, null, userToken);
    assert('11. GET /api/bills/:id retrieves single bill', getBillIdRes.status === 200 && getBillIdRes.body.data._id === billId);

    // 12. Bills PUT Update
    const updateBillRes = await request('PUT', `/api/bills/${billId}`, { status: 'Paid' }, userToken);
    assert('12. PUT /api/bills/:id updates bill status to Paid', updateBillRes.status === 200 && updateBillRes.body.data.status === 'Paid');

    // 13. Subscriptions POST Create
    const createSubRes = await request('POST', '/api/subscriptions', {
      name: 'Netflix Premium HD',
      provider: 'Netflix',
      price: 19.99,
      billingCycle: 'Monthly',
      renewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Entertainment',
    }, userToken);
    assert('13. POST /api/subscriptions creates subscription', createSubRes.status === 201 && createSubRes.body.data.provider === 'Netflix');
    subscriptionId = createSubRes.body.data._id;

    // 14. Subscriptions GET List
    const getSubsRes = await request('GET', '/api/subscriptions', null, userToken);
    assert('14. GET /api/subscriptions lists user subscriptions', getSubsRes.status === 200 && getSubsRes.body.data.subscriptions.length >= 1);

    // 15. Dashboard Overview GET
    const dashOverviewRes = await request('GET', '/api/dashboard', null, userToken);
    assert('15. GET /api/dashboard retrieves financial metrics', dashOverviewRes.status === 200 && dashOverviewRes.body.data.metrics.totalBills >= 1);

    // 16. Health Score GET
    const healthScoreRes = await request('GET', '/api/health-score', null, userToken);
    assert('16. GET /api/health-score calculates health score & recommendations', healthScoreRes.status === 200 && healthScoreRes.body.data.score >= 0);

    // 17. Forecast GET
    const forecastRes = await request('GET', '/api/forecast', null, userToken);
    assert('17. GET /api/forecast returns predictive spending insights', forecastRes.status === 200 && !!forecastRes.body.data.nextMonth);

    // 18. AI Analyze POST
    const aiAnalyzeRes = await request('POST', '/api/ai/analyze', {}, userToken);
    assert('18. POST /api/ai/analyze returns AI spending report', aiAnalyzeRes.status === 200 && !!aiAnalyzeRes.body.data.expenseSummary);

    // 19. AI Chat POST
    const aiChatRes = await request('POST', '/api/ai/chat', { question: 'How much am I spending on subscriptions?' }, userToken);
    assert('19. POST /api/ai/chat returns conversational response', aiChatRes.status === 200 && !!aiChatRes.body.data.answer);

    // 20. Notifications POST Generate
    const genNotifRes = await request('POST', '/api/notifications', {}, userToken);
    assert('20. POST /api/notifications triggers notification engine', genNotifRes.status === 201);

    // 21. Notifications POST Custom Reminder
    const reminderRes = await request('POST', '/api/notifications/reminder', {
      title: 'Pay Gym Membership',
      message: 'Remember to settle monthly gym fee tomorrow',
      priority: 'High',
    }, userToken);
    assert('21. POST /api/notifications/reminder creates reminder log', reminderRes.status === 201 && reminderRes.body.data.title === 'Pay Gym Membership');
    notificationId = reminderRes.body.data._id;

    // 22. Notifications GET List
    const getNotifRes = await request('GET', '/api/notifications', null, userToken);
    assert('22. GET /api/notifications lists user notifications', getNotifRes.status === 200 && getNotifRes.body.data.notifications.length >= 1);

    // 23. Notifications PUT Mark Read
    const markReadRes = await request('PUT', `/api/notifications/${notificationId}/read`, {}, userToken);
    assert('23. PUT /api/notifications/:id/read marks notification as read', markReadRes.status === 200 && markReadRes.body.data.read === true);

    // 24. Gmail Connect GET & Gmail Fetch POST
    const gmailConnectRes = await request('GET', '/api/gmail/connect', null, userToken);
    assert('24. GET /api/gmail/connect returns OAuth redirect URL', gmailConnectRes.status === 200 && !!gmailConnectRes.body.data.authUrl);

    const gmailFetchRes = await request('POST', '/api/gmail/fetch', {}, userToken);
    assert('25. POST /api/gmail/fetch syncs email invoices to MongoDB', gmailFetchRes.status === 200 && gmailFetchRes.body.data.syncedBillsCount >= 0);

    // 26. Delete User Account & Cascading Cleanup
    const deleteUserRes = await request('DELETE', '/api/user', null, userToken);
    assert('26. DELETE /api/user performs cascading user data deletion', deleteUserRes.status === 200 && deleteUserRes.body.success === true);

  } catch (err) {
    console.error('[Test Exception] Error running complete test suite:', err);
  } finally {
    const cleanupUsers = await User.find({ email: { $in: [testEmail, googleEmail] } });
    const cleanupIds = cleanupUsers.map((u) => u._id);
    await Promise.all([
      User.deleteMany({ email: { $in: [testEmail, googleEmail] } }),
      Bill.deleteMany({ user: { $in: cleanupIds } }),
      Subscription.deleteMany({ user: { $in: cleanupIds } }),
      Notification.deleteMany({ user: { $in: cleanupIds } }),
    ]);

    await mongoose.connection.close();
    server.close();

    console.log('\n====================================================');
    console.log(` Test Summary: ${passedCount}/${testCount} tests passed cleanly.`);
    console.log('====================================================');

    if (passedCount === testCount) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
};

runCompleteSuite();
