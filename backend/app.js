const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security & Middleware Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Status Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Pharmaceutical Backend REST API',
    documentation: '/api/health',
  });
});

// API Routes Router
app.use('/api', apiRoutes);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
