# SubSense AI — Backend API (Phase 3 Complete Database & Core APIs)

**SubSense AI** is an AI-powered financial copilot designed to automatically track, analyze, and manage user bills, recurring subscriptions, and overall financial health using artificial intelligence, OCR receipt processing, and Gmail integration.

Phase 3 implements the **Complete Production Database Architecture**, **Bills CRUD APIs**, **Subscriptions CRUD APIs**, and **Dashboard Analytics Aggregations**.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: [Node.js](https://nodejs.org/) (CommonJS modules)
- **Framework**: [Express.js](https://expressjs.com/) v4
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (with compound indexes & aggregation pipelines)
- **Authentication**: JWT (`jsonwebtoken`) Bearer authentication & Cookie support
- **Validation**: `express-validator` & `validator`
- **File Upload Ready**: `multer`

---

## 📁 Project Structure

```text
backend/
├── config/
│   └── db.js                     # MongoDB connection logic
├── controllers/
│   ├── authController.js         # Authentication logic (Signup, Login, Profile, Logout)
│   ├── billController.js         # Bills CRUD, search, filter, sort, overdue auto-sync
│   ├── subscriptionController.js # Subscriptions CRUD, search, filter, sort
│   ├── dashboardController.js    # Dashboard metrics & MongoDB Aggregation Pipelines
│   └── healthController.js       # Health check controller
├── middleware/
│   ├── authMiddleware.js         # JWT protection middleware
│   ├── authorize.js              # Role-based access control (RBAC)
│   ├── errorMiddleware.js        # Global error & ApiError handler
│   └── validate.js               # Express-validator result evaluator
├── models/
│   ├── User.js                   # User Schema with bcrypt password hashing
│   ├── Bill.js                   # Bill Schema with indexes (Pending, Paid, Overdue, Cancelled)
│   ├── Subscription.js           # Subscription Schema with billing cycles & indexes
│   ├── Prediction.js             # AI expense prediction & health score schema
│   ├── Notification.js           # Push notifications & renewal alerts schema
│   └── Chat.js                   # AI copilot chat history & token usage schema
├── routes/
│   ├── healthRoutes.js           # GET /api/v1/health
│   ├── authRoutes.js             # Authentication endpoints
│   ├── billRoutes.js             # Bills REST endpoints
│   ├── subscriptionRoutes.js     # Subscriptions REST endpoints
│   ├── dashboardRoutes.js        # Dashboard overview & summary endpoints
│   ├── aiRoutes.js               # AI copilot placeholder
│   ├── notificationRoutes.js     # Notifications placeholder
│   └── gmailRoutes.js            # Gmail sync placeholder
├── utils/
│   ├── ApiError.js               # Custom operational Error class
│   ├── ApiResponse.js            # Standardized API response helper
│   ├── authValidation.js         # Auth input validation
│   ├── billValidation.js         # Bill input validation
│   ├── subscriptionValidation.js # Subscription input validation
│   └── generateToken.js          # JWT signing utility
├── tests/
│   ├── authTest.js               # Phase 2 test suite
│   └── phase3Test.js             # Phase 3 database & API test suite
├── app.js                        # Express app setup & middleware mounting
├── server.js                     # Server entry point & lifecycle handlers
├── SubSense_AI_Phase3_Postman_Collection.json # Importable Postman collection
└── README.md                     # Technical documentation
```

---

## 🗄️ Database Schemas & Models Overview

### 1. Bill Model (`models/Bill.js`)
- **Fields**: `title`, `merchant`, `category`, `amount`, `currency`, `billDate`, `dueDate`, `status` (`Pending`, `Paid`, `Overdue`, `Cancelled`), `paymentMethod`, `isRecurring`, `recurringFrequency`, `notes`, `billImage`, `ocrText`, `tags`, `user` (ref: User).
- **Indexes**: Compound indexes on `{ user: 1, dueDate: 1 }`, `{ user: 1, status: 1 }`, `{ user: 1, category: 1 }`.

### 2. Subscription Model (`models/Subscription.js`)
- **Fields**: `name`, `provider`, `price`, `currency`, `billingCycle` (`Weekly`, `Monthly`, `Quarterly`, `Yearly`), `renewalDate`, `category`, `status` (`Active`, `Paused`, `Cancelled`), `paymentMethod`, `description`, `logo`, `isAutoRenew`, `user` (ref: User).
- **Indexes**: Compound indexes on `{ user: 1, renewalDate: 1 }`, `{ user: 1, status: 1 }`.

### 3. Prediction Model (`models/Prediction.js`)
- Stores monthly predicted expenses, savings, health scores (0-100), and AI-generated insights.

### 4. Notification Model (`models/Notification.js`)
- Stores renewal alerts, bill warnings, type (`Bill`, `Subscription`, `System`, `AI`), and priority levels.

### 5. Chat Model (`models/Chat.js`)
- Stores user questions, AI responses, model metadata (`gpt-4o`), and token consumption.

---

## 🌐 API Reference

### Base URL: `/api/v1`

| Module | Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Bills** | `POST` | `/api/v1/bills` | Private | Create a new bill |
| | `GET` | `/api/v1/bills` | Private | List bills (filtering, search, sort, pagination) |
| | `GET` | `/api/v1/bills/:id` | Private | Get single bill details |
| | `PUT` | `/api/v1/bills/:id` | Private | Update bill |
| | `DELETE` | `/api/v1/bills/:id` | Private | Delete bill |
| **Subscriptions** | `POST` | `/api/v1/subscriptions` | Private | Create subscription |
| | `GET` | `/api/v1/subscriptions` | Private | List subscriptions (filtering, search, sort, pagination) |
| | `GET` | `/api/v1/subscriptions/:id` | Private | Get single subscription |
| | `PUT` | `/api/v1/subscriptions/:id` | Private | Update subscription |
| | `DELETE` | `/api/v1/subscriptions/:id` | Private | Delete subscription |
| **Dashboard** | `GET` | `/api/v1/dashboard` | Private | Overview metrics & 7-day upcoming bills/renewals |
| | `GET` | `/api/v1/dashboard/summary` | Private | MongoDB Aggregation Pipelines (Monthly spending, category breakdown, top merchants, largest expense, average monthly spending) |

---

## 🔍 Query Parameters (Bills & Subscriptions)

### Bill Query Parameters (`GET /api/v1/bills`)
- `category`: Filter by category (e.g. `Utilities`, `Entertainment`)
- `merchant`: Filter by merchant name
- `status`: Filter by status (`Pending`, `Paid`, `Overdue`, `Cancelled`)
- `startDate` & `endDate`: Filter by due date range (`YYYY-MM-DD`)
- `minAmount` & `maxAmount`: Filter by bill amount range
- `search`: Keyword search across `title`, `merchant`, `notes`, `category`
- `sort`: `newest` (default), `oldest`, `amount_asc`, `amount_desc`, `due_date_asc`, `due_date_desc`, `merchant`
- `page` & `limit`: Pagination parameters (default: `page=1`, `limit=10`)

### Subscription Query Parameters (`GET /api/v1/subscriptions`)
- `status`: Filter by status (`Active`, `Paused`, `Cancelled`)
- `provider`: Filter by provider
- `billingCycle`: Filter by cycle (`Weekly`, `Monthly`, `Quarterly`, `Yearly`)
- `startDate` & `endDate`: Filter by renewal date range
- `search`: Keyword search across `name`, `provider`, `description`
- `sort`: `newest`, `oldest`, `price_asc`, `price_desc`, `renewal_date_asc`, `renewal_date_desc`
- `page` & `limit`: Pagination parameters

---

## 🧪 Testing

Execute automated integration tests:

```bash
# Run Phase 3 DB & API Test Suite
npm run test:phase3

# Run Phase 2 Auth Test Suite
npm run test:auth
```
