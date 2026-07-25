const mongoose = require('mongoose');
const http = require('http');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');

const TEST_MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/subsense_ai_test';

const runTests = async () => {
  console.log('====================================================');
  console.log(' SubSense AI - Phase 2 Authentication Test Suite');
  console.log('====================================================\n');

  // Connect to test database
  await mongoose.connect(TEST_MONGO_URI);
  console.log('[DB] Connected to test database.');

  // Clear existing test users
  await User.deleteMany({ email: { $in: ['testuser@subsense.ai', 'duplicate@subsense.ai'] } });

  // Start HTTP server on random port
  const server = app.listen(0);
  const port = server.address().port;

  const request = (method, path, body = null, headers = {}) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: '127.0.0.1',
        port,
        path: `/api/v1/auth${path}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
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

  let validToken = '';

  try {
    // 1. Weak password rejected
    const test1 = await request('POST', '/signup', {
      name: 'Test User',
      email: 'testuser@subsense.ai',
      password: 'weak',
    });
    assert('1. Weak password rejected', test1.status === 400 && test1.body.success === false);

    // 2. Invalid email rejected
    const test2 = await request('POST', '/signup', {
      name: 'Test User',
      email: 'not-an-email',
      password: 'Password123!',
    });
    assert('2. Invalid email rejected', test2.status === 400 && test2.body.success === false);

    // 3. Register new user
    const test3 = await request('POST', '/signup', {
      name: 'Test User',
      email: 'testuser@subsense.ai',
      password: 'Password123!',
    });
    assert('3. Register new user success', test3.status === 201 && test3.body.success === true && !!test3.body.token);
    validToken = test3.body.token;

    // 4. Duplicate registration rejected
    const test4 = await request('POST', '/signup', {
      name: 'Test User 2',
      email: 'testuser@subsense.ai',
      password: 'Password123!',
    });
    assert('4. Duplicate registration rejected', test4.status === 400 && test4.body.success === false);

    // 5. Login success
    const test5 = await request('POST', '/login', {
      email: 'testuser@subsense.ai',
      password: 'Password123!',
    });
    assert('5. Login success with valid credentials', test5.status === 200 && test5.body.success === true && !!test5.body.token);

    // 6. Wrong password
    const test6 = await request('POST', '/login', {
      email: 'testuser@subsense.ai',
      password: 'WrongPassword123!',
    });
    assert('6. Login rejected with wrong password', test6.status === 401 && test6.body.success === false);

    // 7. Unknown email
    const test7 = await request('POST', '/login', {
      email: 'unknown@subsense.ai',
      password: 'Password123!',
    });
    assert('7. Login rejected with unknown email', test7.status === 401 && test7.body.success === false);

    // 8. Access profile with valid JWT
    const test8 = await request('GET', '/profile', null, {
      Authorization: `Bearer ${validToken}`,
    });
    assert('8. Access profile with valid JWT', test8.status === 200 && test8.body.success === true && test8.body.data.email === 'testuser@subsense.ai');

    // 9. Access profile without JWT
    const test9 = await request('GET', '/profile');
    assert('9. Access profile rejected without JWT', test9.status === 401 && test9.body.success === false);

    // 10. Access profile with invalid token
    const test10 = await request('GET', '/profile', null, {
      Authorization: 'Bearer invalid.token.string',
    });
    assert('10. Access profile rejected with invalid token', test10.status === 401 && test10.body.success === false);

    // 11. Access profile with expired token
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_subsense_ai';
    const expiredToken = jwt.sign({ id: new mongoose.Types.ObjectId(), email: 'expired@test.com', role: 'User' }, secret, { expiresIn: -10 });
    const test11 = await request('GET', '/profile', null, {
      Authorization: `Bearer ${expiredToken}`,
    });
    assert('11. Access profile rejected with expired token', test11.status === 401 && test11.body.success === false);

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    // Cleanup test user
    await User.deleteMany({ email: 'testuser@subsense.ai' });
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
