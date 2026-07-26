# SubSense AI — Autonomous Financial Copilot (Production Backend API)

**SubSense AI** is an intelligent, autonomous financial copilot designed to automatically track, analyze, and optimize user bills, recurring subscriptions, and overall financial health. It features OCR receipt processing, Gmail auto-sync, financial health scoring, expense forecasting, conversational AI assistance (via Google Gemini), Socket.IO real-time notifications, and security controls.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: [Node.js](https://nodejs.org/) (CommonJS)
- **Framework**: [Express.js](https://expressjs.com/) v4
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (with compound indexes & aggregation pipelines)
- **Authentication**: JWT (`jsonwebtoken`) Bearer tokens & HTTP-only cookies
- **OAuth**: Google OAuth 2.0 (`google-auth-library`)
- **AI Engine**: Google Gemini 1.5 Flash (`@google/generative-ai`) with financial intelligence fallback engine
- **OCR Engine**: Tesseract OCR (`tesseract.js`) & PDF parsing
- **Real-time WebSockets**: Socket.IO (`socket.io`)
- **Security & Middleware**: `helmet`, `morgan`, `express-rate-limit`, `cors`, `cookie-parser`, `express-validator`
- **File Uploads**: `multer`

---

## 📁 Project Structure

```text
backend/
├── config/
│   └── db.js                     # MongoDB connection logic
├── controllers/
│   ├── authController.js         # Signup, Login, Google OAuth, Password Reset, Logout
│   ├── userController.js         # Profile GET/PUT, Password Change, Account Deletion
│   ├── billController.js         # Bills CRUD, OCR Upload, Filtering, Sorting, Pagination
│   ├── subscriptionController.js # Subscriptions CRUD, Renewal Tracking
│   ├── dashboardController.js    # Dashboard Overview, Summary Aggregations, Health Score, Forecast
│   ├── aiController.js           # AI Financial Spending Analysis & Chatbot
│   ├── notificationController.js # Notifications List, Custom Reminders, Mark Read, Delete
│   ├── gmailController.js        # Gmail Connect OAuth & Invoice Sync
│   ├── ocrController.js          # Standalone OCR Invoice Extraction
│   └── healthController.js       # System Health Check
├── middleware/
│   ├── authMiddleware.js         # JWT protection middleware
│   ├── authorize.js              # Role-based access control (RBAC)
│   ├── errorMiddleware.js        # Global error & ApiError handler
│   ├── rateLimiter.js            # Express Rate Limiter
│   ├── uploadMiddleware.js       # Multer file upload handler
│   └── validate.js               # Express-validator result evaluator
├── models/
│   ├── User.js                   # User Schema with bcrypt password hashing
│   ├── Bill.js                   # Bill Schema with compound indexes
│   ├── Subscription.js           # Subscription Schema with renewal date indexes
│   ├── Prediction.js             # Monthly expense forecast schema
│   ├── Notification.js           # Push notifications & renewal alerts schema
│   ├── Chat.js                   # AI copilot chat history schema
│   ├── EmailScan.js              # Gmail sync audit log schema
│   ├── ReminderLog.js            # Automated reminder execution log schema
│   └── HealthScore.js            # Historical financial health score snapshots schema
├── routes/
│   ├── healthRoutes.js           # GET /api/v1/health
│   ├── authRoutes.js             # Auth endpoints (Signup, Login, Google, Forgot/Reset Password)
│   ├── userRoutes.js             # User Profile & Account Management
│   ├── billRoutes.js             # Bills CRUD & Upload
│   ├── subscriptionRoutes.js     # Subscriptions CRUD
│   ├── dashboardRoutes.js        # Dashboard Overview & Summary
│   ├── healthScoreRoutes.js      # Financial Health Score API
│   ├── forecastRoutes.js         # Expense Forecasting API
│   ├── aiRoutes.js               # AI Spending Analysis & Chat Assistant
│   ├── notificationRoutes.js     # Notification & Reminder APIs
│   ├── gmailRoutes.js            # Gmail Integration APIs
│   └── ocrRoutes.js              # Standalone OCR Extraction API
├── sockets/
│   └── notificationSocket.js     # Socket.IO real-time event handlers
├── utils/
│   ├── ApiError.js               # Custom operational Error class
│   ├── ApiResponse.js            # Standardized API response helper
│   ├── authValidation.js         # Auth input validation
│   ├── billValidation.js         # Bill input validation
│   ├── subscriptionValidation.js # Subscription input validation
│   └── generateToken.js          # JWT signing utility
├── tests/
│   ├── authTest.js               # Auth unit test suite
│   ├── phase3Test.js             # DB & CRUD integration test suite
│   └── completeSuiteTest.js      # Complete End-to-End API Integration Suite (26/26 tests passing)
├── uploads/                      # Uploaded receipt images/PDFs
├── app.js                        # Express app setup & dual prefix route mounting
├── server.js                     # Server entry point & Socket.IO initialization
├── SubSense_AI_Complete_Postman_Collection.json # Importable Postman collection
└── README.md                     # Technical documentation
```

---

## 🗄️ Database Schemas & Collections Overview

1. **Users (`User.js`)**: Name, Email, Hashed Password, Avatar, Role (`User`, `Admin`), Google ID, Verification Status.
2. **Bills (`Bill.js`)**: Title, Merchant, Category, Amount, Currency, Due Date, Status (`Pending`, `Paid`, `Overdue`, `Cancelled`), Payment Method, OCR Text, Bill Image path.
3. **Subscriptions (`Subscription.js`)**: Name, Provider, Price, Billing Cycle (`Weekly`, `Monthly`, `Quarterly`, `Yearly`), Renewal Date, Category, Auto-Renew status.
4. **Predictions (`Prediction.js`)**: Monthly predicted expenses, savings, and AI insights.
5. **Notifications (`Notification.js`)**: Title, Message, Type (`Bill`, `Subscription`, `System`, `AI`), Priority (`Low`, `Medium`, `High`), Read state.
6. **ChatHistory (`Chat.js`)**: User questions, AI answers, Model metadata, Token usage.
7. **EmailScans (`EmailScan.js`)**: Gmail sync logs, imported bill/subscription counts, scan date, status.
8. **ReminderLogs (`ReminderLog.js`)**: Scheduled reminder logs, target ID, channel (`InApp`, `Email`, `Socket`).
9. **HealthScores (`HealthScore.js`)**: Historical health scores (0-100), grade, penalty breakdown, suggestions.

---

## 🌐 API Reference (Accessible via `/api/v1` and `/api` prefixes)

### 🔑 Auth & User APIs
- `POST /api/auth/signup` — Register user account
- `POST /api/auth/login` — Login user & receive JWT token
- `POST /api/auth/google` — Google OAuth ID Token backend authentication
- `POST /api/auth/forgot-password` — Request password reset token
- `POST /api/auth/reset-password` — Reset password using token
- `GET /api/user/profile` — Get authenticated user profile
- `PUT /api/user/profile` — Update name and avatar
- `PUT /api/user/password` — Change password
- `DELETE /api/user` — Delete account and clean up associated records

### 💵 Bills & OCR APIs
- `POST /api/bills` — Create bill
- `POST /api/bills/upload` — Upload receipt image/PDF, run OCR, and create bill record
- `GET /api/bills` — Filter, search, sort, and paginate bills
- `GET /api/bills/:id` — Get bill details
- `PUT /api/bills/:id` — Update bill
- `DELETE /api/bills/:id` — Delete bill
- `POST /api/ocr/extract` — Standalone receipt OCR extraction

### 🔄 Subscriptions APIs
- `POST /api/subscriptions` — Add subscription
- `GET /api/subscriptions` — Filter, search, sort, and paginate subscriptions
- `GET /api/subscriptions/:id` — Get subscription details
- `PUT /api/subscriptions/:id` — Update subscription
- `DELETE /api/subscriptions/:id` — Delete subscription

### 📊 Dashboard, Health Score & Forecast APIs
- `GET /api/dashboard` — Overview metrics, upcoming bills, and renewals
- `GET /api/dashboard/summary` — Aggregation pipelines (monthly spending, category breakdown, top merchants)
- `GET /api/health-score` — Multi-factor financial health score (0-100), status, grade, suggestions
- `GET /api/forecast` — Predictive expense forecast for next week, month, and quarter

### 🤖 AI Copilot APIs
- `POST /api/ai/analyze` — Perform full AI spending analysis & risk alert check
- `POST /api/ai/chat` — Conversational financial assistant Q&A chatbot

### 🔔 Notifications & Reminders APIs
- `GET /api/notifications` — Retrieve notifications
- `POST /api/notifications` — Trigger smart notification scan
- `POST /api/notifications/reminder` — Create custom reminder log
- `PUT /api/notifications/:id/read` — Mark notification read
- `DELETE /api/notifications/:id` — Delete notification

### 📧 Gmail Integration APIs
- `GET /api/gmail/connect` — Get OAuth authorization URL
- `GET /api/gmail/callback` — OAuth code callback handler
- `POST /api/gmail/fetch` — Sync invoice emails into MongoDB bills/subscriptions

---

## 🧪 Automated Testing Suite

Execute the full suite of integration tests:

```bash
# Run Complete End-to-End API Integration Suite (26/26 Tests)
npm run test:complete

# Run Auth Test Suite
npm run test:auth

# Run DB & API Test Suite
npm run test:phase3
```

---

## 🚀 Deployment (Render Ready)

1. Set Environment Variables on Render:
   - `PORT=5000`
   - `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/subsense_ai`
   - `JWT_SECRET=your_production_jwt_secret`
   - `GEMINI_API_KEY=your_google_gemini_api_key`
2. Build & Start command: `npm install && npm start`
3. Health check URL: `https://your-app.onrender.com/api/v1/health`
