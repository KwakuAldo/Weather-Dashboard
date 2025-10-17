// Environment configuration for Weather Dashboard
// This file handles environment variables for different deployment environments

(function() {
    'use strict';
    
    // Set up environment variables for browser
    // In production (Netlify), these will be injected at build time
    window.OPENWEATHER_API_KEY = window.OPENWEATHER_API_KEY || 
        (typeof process !== 'undefined' && process.env && process.env.OPENWEATHER_API_KEY) ||
        '3051a4bfda3c8c88aa4b9c7b7618fd0a'; // Injected from environment variable
    
    // Log configuration status
    if (window.OPENWEATHER_API_KEY && window.OPENWEATHER_API_KEY !== 'your_api_key_here') {
        console.log('✅ Weather Dashboard: API key configured');
    } else {
        console.warn('⚠️ Weather Dashboard: Using fallback API key. For production, set OPENWEATHER_API_KEY environment variable.');
    }
})();