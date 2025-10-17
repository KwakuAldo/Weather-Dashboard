#!/usr/bin/env node

/**
 * Build script for Weather Dashboard
 * Injects environment variables into the config.js file for production
 */

const fs = require('fs');
const path = require('path');

// Read the current config.js
const configPath = path.join(__dirname, 'config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Get API key from environment variable
const apiKey = process.env.OPENWEATHER_API_KEY || '3051a4bfda3c8c88aa4b9c7b7618fd0a';

// Replace the fallback API key with the environment variable
configContent = configContent.replace(
    /'3051a4bfda3c8c88aa4b9c7b7618fd0a'; \/\/ Fallback for development/,
    `'${apiKey}'; // Injected from environment variable`
);

// Write the updated config.js
fs.writeFileSync(configPath, configContent);

console.log('✅ Build script completed - Environment variables injected');
console.log(`🔑 API Key configured: ${apiKey.substring(0, 8)}...`);