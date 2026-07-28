const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[Server] Pharma Backend Running on Port: ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server] Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection Error] ${err.message}`);
  server.close(() => process.exit(1));
});
