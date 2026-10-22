const dns = require('dns');

try {
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch (e) {
  // ignore
}

const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const config = require('./src/config/env');

const apiRoutes = require('./src/routes');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

const connectDB = require('./src/config/db');
const app = express();

// ================================
// Middleware
// ================================

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fast Root Ping for Render keep-alive / cold-start checks
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'J K BIOTECH Backend API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);


connectDB();

// ================================
// Server
// ================================

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 J K BIOTECH Backend running on port ${PORT}`);

  // ── Keep-Alive Ping (Render Free Tier) ──────────────────────────────────
  // Render spins down free-tier services after 15 minutes of inactivity.
  // This self-ping fires every 14 minutes to prevent that cold start.
  // Only runs in production (RENDER_EXTERNAL_URL is set by Render automatically).
  const selfUrl = process.env.RENDER_EXTERNAL_URL;
  if (selfUrl) {
    const https = require('https');
    const pingInterval = 14 * 60 * 1000; // 14 minutes

    const ping = () => {
      const url = `${selfUrl}/`;
      https.get(url, (res) => {
        console.log(`✅ Keep-alive ping: ${res.statusCode} ${new Date().toISOString()}`);
      }).on('error', (err) => {
        console.warn(`⚠️ Keep-alive ping failed: ${err.message}`);
      });
    };

    // First ping after 5 minutes (give server time to warm up)
    setTimeout(() => {
      ping();
      setInterval(ping, pingInterval);
    }, 5 * 60 * 1000);

    console.log(`🔄 Keep-alive enabled → pinging ${selfUrl} every 14 min`);
  }
});