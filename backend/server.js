const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

// Handle Uncaught Exceptions before loading application dependencies
process.on('uncaughtException', (err) => {
  console.error('[Server Error] Uncaught Exception thrown:', err);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const connectDB = require('./config/db');
const initNotificationSocket = require('./sockets/notificationSocket');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize Database Connection
connectDB();

// Create HTTP Server & Attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
});

// Initialize Socket.IO Real-time Notification Engine
initNotificationSocket(io);

// Start HTTP Server
server.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(` SubSense AI Backend Server Started`);
  console.log(` Environment: ${NODE_ENV}`);
  console.log(` Port       : ${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(` Socket.IO  : Enabled`);
  console.log(`===========================================`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error('[Server Error] Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      console.log('[Server] Closed server due to unhandled promise rejection.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Graceful Shutdown on Termination Signals
const gracefulShutdown = (signal) => {
  console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
