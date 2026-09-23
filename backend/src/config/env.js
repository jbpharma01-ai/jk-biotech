const requiredEnvVariables = [
  'MONGO_URI',
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.error(`❌ Missing required environment variable: ${variable}`);
    process.exit(1);
  }
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGO_URI,

  jwtSecret: process.env.JWT_SECRET || 'jk_biotech_jwt_secret_key_default_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  adminEmail: process.env.ADMIN_EMAIL || 'admin@jkbiotech.in',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@JKBiotech2026',

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
};

module.exports = config;


