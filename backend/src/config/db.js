const dns = require('dns');
try {
  // Force IPv4 to avoid IPv6 DNS resolution issues
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore DNS override errors
}

const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async (retries = 5, delay = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 MongoDB connecting... (attempt ${attempt}/${retries})`);
      const connection = await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
        family: 4, // Force IPv4
      });

      console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
      return connection;
    } catch (error) {
      console.error(`❌ MongoDB Attempt ${attempt} Failed: ${error.message}`);
      if (attempt < retries) {
        console.log(`⏳ Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error('💀 All MongoDB connection attempts failed. Exiting.');
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;