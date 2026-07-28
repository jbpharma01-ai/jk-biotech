const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    // Non-fatal fallback warning for initial setup before Atlas URI is populated
    console.warn('[Database Warning] Set valid MONGODB_URI in backend/.env to connect to MongoDB Atlas.');
  }
};

module.exports = connectDB;
