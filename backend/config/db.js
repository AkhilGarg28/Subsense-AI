const mongoose = require('mongoose');

/**
 * Connect to MongoDB database asynchronously.
 * Supports cloud MongoDB Atlas URI in production with graceful error logging.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/subsense_ai';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    if (process.env.NODE_ENV === 'production' && uri.includes('127.0.0.1')) {
      console.warn('[Database Notice] Deployed on cloud (Render). Please set MONGO_URI environment variable to your MongoDB Atlas connection string in Render Dashboard -> Environment.');
    }
  }
};

module.exports = connectDB;
