const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRateLimiter = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const healthScoreRoutes = require('./routes/healthScoreRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const aiRoutes = require('./routes/aiRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const gmailRoutes = require('./routes/gmailRoutes');
const ocrRoutes = require('./routes/ocrRoutes');

const app = express();

// Security Headers & Request Logging
app.use(helmet({ crossOriginResourcePolicy: false }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global Rate Limiting
app.use(apiRateLimiter);

// Core Security & Request Parsing Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static Uploads Serving
app.use('/uploads', express.static('uploads'));

// Mount API Routes (supporting both /api/v1 and /api base paths)
app.use(['/api/v1/health', '/api/health'], healthRoutes);
app.use(['/api/v1/auth', '/api/auth'], authRoutes);
app.use(['/api/v1/user', '/api/user'], userRoutes);
app.use(['/api/v1/bills', '/api/bills'], billRoutes);
app.use(['/api/v1/subscriptions', '/api/subscriptions'], subscriptionRoutes);
app.use(['/api/v1/dashboard', '/api/dashboard'], dashboardRoutes);
app.use(['/api/v1/health-score', '/api/health-score'], healthScoreRoutes);
app.use(['/api/v1/forecast', '/api/forecast'], forecastRoutes);
app.use(['/api/v1/ai', '/api/ai'], aiRoutes);
app.use(['/api/v1/notifications', '/api/notifications'], notificationRoutes);
app.use(['/api/v1/gmail', '/api/gmail'], gmailRoutes);
app.use(['/api/v1/ocr', '/api/ocr'], ocrRoutes);

// Root Endpoint Welcome Message
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SubSense AI - Autonomous Financial Copilot API',
    health: '/api/v1/health',
    version: '1.0.0',
  });
});

// Centralized Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
