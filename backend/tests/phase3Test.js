const mongoose = require('mongoose');
const http = require('http');
const app = require('../app');
const User = require('../models/User');
const Bill = require('../models/Bill');
const Subscription = require('../models/Subscription');

const TEST_MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/subsense_ai_test';

const runTests = async () => {
  console.log('====================================================');
  console.log(' SubSense AI - Phase 3 Database & API Test Suite');
  console.log('====================================================\n');

  await mongoose.connect(TEST_MONGO_URI);
  console.log('[DB] Connected to test database.');

  // Cleanup test users & data
  const testEmailA = 'userA@subsense.ai';
  const testEmailB = 'userB@subsense.ai';

  const users = await User.find({ email: { $in: [testEmailA, testEmailB] } });
  const userIds = users.map((u) => u._id);

  await Bill.deleteMany({ user: { $in: userIds } });
  await Subscription.deleteMany({ user: { $in: userIds } });
  await User.deleteMany({ email: { $in: [testEmailA, testEmailB] } });

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
        path: `/api/v1${path}`,
        method,
        headers,
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch (e) {
            parsed = data;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  let testCount = 0;
  let passedCount = 0;

  const assert = (description, condition, extraInfo = '') => {
    testCount++;
    if (condition) {
      passedCount++;
      console.log(` ✓ [PASS] ${description}`);
    } else {
      console.error(` ✗ [FAIL] ${description} ${extraInfo}`);
    }
  };

  try {
    // Setup Users A and B
    const signupA = await request('POST', '/auth/signup', {
      name: 'User Alpha',
      email: testEmailA,
      password: 'Password123!',
    });
    const tokenA = signupA.body.token;

    const signupB = await request('POST', '/auth/signup', {
      name: 'User Beta',
      email: testEmailB,
      password: 'Password123!',
    });
    const tokenB = signupB.body.token;

    // 1. Bill Validation Rejection
    const res1 = await request('POST', '/bills', { title: '', merchant: '', amount: -50 }, tokenA);
    assert('1. Create Bill validation fails on invalid payload', res1.status === 400);

    // 2. Create Valid Bill for User A
    const res2 = await request('POST', '/bills', {
      title: 'Electricity Bill',
      merchant: 'Power Corp',
      category: 'Utilities',
      amount: 120.50,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Pending',
    }, tokenA);
    assert('2. Create Bill success for User A', res2.status === 201 && res2.body.data.title === 'Electricity Bill');
    const billIdA = res2.body.data._id;

    // Create Overdue Bill for User A
    await request('POST', '/bills', {
      title: 'Past Internet Bill',
      merchant: 'Net Provider',
      category: 'Utilities',
      amount: 60.00,
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: 'Pending',
    }, tokenA);

    // 3. Get Bills for User A & Auto Overdue Sync Check
    const res3 = await request('GET', '/bills?category=Utilities', null, tokenA);
    const overdueBill = res3.body.data.bills.find((b) => b.title === 'Past Internet Bill');
    assert('3. Get Bills & Auto-sync Overdue status verified', res3.status === 200 && overdueBill && overdueBill.status === 'Overdue');

    // 4. Ownership Isolation Check (User B trying to access User A's Bill)
    const res4 = await request('GET', `/bills/${billIdA}`, null, tokenB);
    assert('4. Ownership isolation: User B cannot access User A\'s bill', res4.status === 404);

    // 5. Update Bill for User A
    const res5 = await request('PUT', `/bills/${billIdA}`, { status: 'Paid' }, tokenA);
    assert('5. Update Bill status to Paid', res5.status === 200 && res5.body.data.status === 'Paid');

    // 6. Create Subscription for User A
    const res6 = await request('POST', '/subscriptions', {
      name: 'Netflix Premium',
      provider: 'Netflix',
      price: 19.99,
      billingCycle: 'Monthly',
      renewalDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Entertainment',
    }, tokenA);
    assert('6. Create Subscription success for User A', res6.status === 201 && res6.body.data.name === 'Netflix Premium');
    const subIdA = res6.body.data._id;

    // 7. Filter & Search Subscriptions
    const res7 = await request('GET', '/subscriptions?search=Netflix&status=Active', null, tokenA);
    assert('7. Filter & Search Subscriptions', res7.status === 200 && res7.body.data.subscriptions.length === 1);

    // 8. Ownership Isolation on Subscription Delete
    const res8 = await request('DELETE', `/subscriptions/${subIdA}`, null, tokenB);
    assert('8. Ownership isolation: User B cannot delete User A\'s subscription', res8.status === 404);

    // 9. GET Dashboard Overview (/api/v1/dashboard)
    const res9 = await request('GET', '/dashboard', null, tokenA);
    assert('9. Dashboard Overview returns correct metrics', res9.status === 200 && res9.body.data.metrics.totalBills >= 2 && res9.body.data.metrics.totalActiveSubscriptions === 1);

    // 10. GET Dashboard Summary Aggregations (/api/v1/dashboard/summary)
    const res10 = await request('GET', '/dashboard/summary', null, tokenA);
    assert('10. Dashboard Summary Aggregations success', res10.status === 200 && res10.body.data.topMerchants.length > 0 && res10.body.data.categoryWiseSpending.length > 0);

  } catch (err) {
    console.error('Test Error:', err);
  } finally {
    const cleanupUsers = await User.find({ email: { $in: [testEmailA, testEmailB] } });
    const cleanupIds = cleanupUsers.map((u) => u._id);
    await Bill.deleteMany({ user: { $in: cleanupIds } });
    await Subscription.deleteMany({ user: { $in: cleanupIds } });
    await User.deleteMany({ email: { $in: [testEmailA, testEmailB] } });
    await mongoose.connection.close();
    server.close();

    console.log('\n====================================================');
    console.log(` Summary: ${passedCount}/${testCount} tests passed.`);
    console.log('====================================================');

    if (passedCount === testCount) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
};

runTests();
