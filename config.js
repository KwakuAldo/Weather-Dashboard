// Weather API Configuration
// Note: In production, use environment variables for API keys
const API_KEY = process.env.OPENWEATHER_API_KEY || "3051a4bfda3c8c88aa4b9c7b7618fd0a";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_KEY, API_BASE_URL };
}