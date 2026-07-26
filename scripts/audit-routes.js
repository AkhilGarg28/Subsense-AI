import http from 'http';

const routes = [
  '/',
  '/login',
  '/signup',
  '/dashboard',
  '/upload',
  '/subscriptions',
  '/subscription',
  '/chat',
  '/notifications',
  '/profile',
  '/settings',
];

console.log('====================================================');
console.log('SubSense AI — Automated Route Accessibility Audit');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

const testRoute = (route) => {
  return new Promise((resolve) => {
    http.get(`http://localhost:5173${route}`, (res) => {
      if (res.statusCode === 200) {
        console.log(`[PASS] http://localhost:5173${route} — Status Code: ${res.statusCode} OK`);
        passed++;
      } else {
        console.log(`[FAIL] http://localhost:5173${route} — Status Code: ${res.statusCode}`);
        failed++;
      }
      resolve();
    }).on('error', (err) => {
      console.log(`[FAIL] http://localhost:5173${route} — Error: ${err.message}`);
      failed++;
      resolve();
    });
  });
};

async function runAudit() {
  for (const route of routes) {
    await testRoute(route);
  }
  console.log('\n====================================================');
  console.log(`Audit Complete: ${passed} Passed, ${failed} Failed out of ${routes.length} total routes.`);
  console.log('====================================================');
}

runAudit();
