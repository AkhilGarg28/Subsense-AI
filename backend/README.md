# SubSense AI — Backend API (Phase 2 Authentication Module)

**SubSense AI** is an AI-powered financial copilot designed to automatically track, analyze, and manage user bills, recurring subscriptions, and overall financial health using artificial intelligence, OCR receipt processing, and Gmail integration.

Phase 2 adds a complete, secure, and production-ready **Authentication & Authorization Module**.

---

## 🛠️ Tech Stack & Dependencies

- **Runtime**: [Node.js](https://nodejs.org/) (CommonJS modules)
- **Framework**: [Express.js](https://expressjs.com/) v4
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication & Security**: `jsonwebtoken` (JWT), `bcryptjs` (Password Hashing), `express-validator` & `validator` (Sanitization & Validation), `cookie-parser`
- **Utility / Middleware**: `dotenv`, `cors`, `multer`, `axios`
- **Development Tooling**: `nodemon`

---

## 📁 Folder Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB async connection logic
├── controllers/
│   ├── authController.js     # User registration, login, profile, and logout logic
│   └── healthController.js   # Health check controller
├── middleware/
│   ├── authMiddleware.js     # JWT guard (protect) middleware
│   ├── authorize.js          # Role-based access control (RBAC) middleware
│   ├── errorMiddleware.js    # 404 & Centralized Error Handler (ApiError handling)
│   └── validate.js           # Express-validator error evaluator
├── models/
│   └── User.js               # Mongoose User Schema with bcrypt hooks & comparePassword()
├── routes/
│   ├── healthRoutes.js       # GET /api/v1/health
│   ├── authRoutes.js         # Authentication endpoints (Signup, Login, Profile, Logout)
│   ├── billRoutes.js         # Bill processing endpoints placeholder
│   ├── subscriptionRoutes.js # Subscription management endpoints placeholder
│   ├── dashboardRoutes.js    # Financial dashboard analytics placeholder
│   ├── aiRoutes.js           # AI chat & forecasting placeholder
│   ├── notificationRoutes.js # Renewal & spending alerts placeholder
│   └── gmailRoutes.js        # Gmail sync endpoints placeholder
├── services/                 # Business logic & 3rd party integrations (Phase 3+)
├── utils/
│   ├── ApiError.js           # Custom operational API Error class
│   ├── ApiResponse.js        # Standardized API response helper
│   ├── authValidation.js     # Express-validator signup & login rules
│   └── generateToken.js      # JWT signing utility
├── uploads/                  # Temporary file upload storage
├── tests/
│   └── authTest.js           # Automated integration test runner
├── app.js                    # Express app setup & middleware mounting
├── server.js                 # HTTP server entry point & lifecycle handlers
├── package.json              # Dependencies & npm scripts
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── SubSense_AI_Phase2_Postman_Collection.json # Postman API Collection
└── README.md                 # Technical documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   ```bash
   cp .env.example .env
   ```

4. Start Development Server:
   ```bash
   npm run dev
   ```

5. Run Automated Auth Integration Tests:
   ```bash
   npm run test:auth
   ```

---

## 🔑 Authentication Endpoints & Usage

### Base URL: `/api/v1/auth`

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Public | Register a new user account |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/v1/auth/profile` | Private | Retrieve authenticated user profile |
| `POST` | `/api/v1/auth/logout` | Public | Clear session cookie |

---

### Request & Response Specifications

#### 1. User Signup
- **URL**: `POST /api/v1/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Password Rules**: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character (`@$!%*?&#`).
- **Request Body**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "password": "Password123!"
  }
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "66a2b8e390c5f21234567890",
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "role": "User",
      "avatar": "",
      "isVerified": false,
      "createdAt": "2026-07-25T20:20:00.000Z"
    }
  }
  ```

#### 2. User Login
- **URL**: `POST /api/v1/auth/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "Password123!"
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "66a2b8e390c5f21234567890",
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "role": "User",
      "avatar": "",
      "isVerified": false,
      "createdAt": "2026-07-25T20:20:00.000Z"
    }
  }
  ```

#### 3. Protected Profile
- **URL**: `GET /api/v1/auth/profile`
- **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "User profile retrieved successfully",
    "data": {
      "id": "66a2b8e390c5f21234567890",
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "role": "User",
      "avatar": "",
      "isVerified": false,
      "createdAt": "2026-07-25T20:20:00.000Z"
    }
  }
  ```

#### 4. User Logout
- **URL**: `POST /api/v1/auth/logout`
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

## 📬 Postman Collection

An importable Postman collection file is provided in the repository at:
`backend/SubSense_AI_Phase2_Postman_Collection.json`

Import this file into Postman to automatically test Signup, Login, Profile (with dynamic token variable), and Logout endpoints.
