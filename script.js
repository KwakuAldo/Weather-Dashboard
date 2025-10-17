// API configuration with environment variable support
const API_KEY = window.OPENWEATHER_API_KEY || "3051a4bfda3c8c88aa4b9c7b7618fd0a";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Check if API key is properly configured
if (!API_KEY || API_KEY === "your_api_key_here") {
    console.warn("⚠️ OpenWeatherMap API key not configured. Please set OPENWEATHER_API_KEY environment variable.");
}

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const forecastInfo = document.getElementById("forecast-info");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const citySuggestions = document.getElementById("city-suggestions");

// Debouncing variables
let debounceTimer;
let selectedSuggestionIndex = -1;
let currentSuggestions = [];

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        hideSuggestions();
    }
});

// Add Enter key support
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
            hideSuggestions();
        }
    }
});

// Input event with debouncing
cityInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    
    // Clear previous timer
    clearTimeout(debounceTimer);
    
    if (query.length >= 2) {
        // Debounce the search
        debounceTimer = setTimeout(() => {
            searchCities(query);
        }, 300); // 300ms delay
    } else {
        hideSuggestions();
    }
});

// Keyboard navigation for suggestions
cityInput.addEventListener("keydown", (e) => {
    if (!citySuggestions.classList.contains("hidden")) {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, currentSuggestions.length - 1);
                updateSuggestionSelection();
                break;
            case "ArrowUp":
                e.preventDefault();
                selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
                updateSuggestionSelection();
                break;
            case "Escape":
                hideSuggestions();
                break;
        }
    }
});

// Click outside to close suggestions
document.addEventListener("click", (e) => {
    if (!e.target.closest("#city-input") && !e.target.closest("#city-suggestions")) {
        hideSuggestions();
    }
});

// City search function with debouncing
async function searchCities(query) {
    try {
        // Show loading state
        citySuggestions.innerHTML = `
            <div class="px-4 py-3 text-center text-gray-600">
                <div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-weather-blue mr-2"></div>
                Searching cities...
            </div>
        `;
        citySuggestions.classList.remove("hidden");
        
        const response = await fetch(
            `${API_BASE_URL}/find?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric&cnt=5`
        );
        
        if (!response.ok) {
            throw new Error(`City search API error: ${response.status}`);
        }
        
        const data = await response.json();
        displayCitySuggestions(data.list || []);
        
    } catch (err) {
        console.error("Error searching cities:", err);
        hideSuggestions();
    }
}

// Display city suggestions
function displayCitySuggestions(cities) {
    if (cities.length === 0) {
        hideSuggestions();
        return;
    }
    
    currentSuggestions = cities;
    selectedSuggestionIndex = -1;
    
    citySuggestions.innerHTML = cities.map((city, index) => `
        <div class="city-suggestion px-4 py-3 hover:bg-white/20 cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-b-0" 
             data-index="${index}" 
             data-city="${city.name}" 
             data-country="${city.sys.country}">
            <div class="font-medium text-gray-800">${city.name}</div>
            <div class="text-sm text-gray-600">${city.sys.country} • ${city.coord.lat.toFixed(2)}, ${city.coord.lon.toFixed(2)}</div>
        </div>
    `).join('');
    
    // Add click listeners to suggestions
    citySuggestions.querySelectorAll('.city-suggestion').forEach((suggestion, index) => {
        suggestion.addEventListener('click', () => {
            selectCity(cities[index]);
        });
    });
    
    citySuggestions.classList.remove("hidden");
}

// Update suggestion selection highlighting
function updateSuggestionSelection() {
    const suggestions = citySuggestions.querySelectorAll('.city-suggestion');
    
    suggestions.forEach((suggestion, index) => {
        if (index === selectedSuggestionIndex) {
            suggestion.classList.add('bg-white/20');
            suggestion.scrollIntoView({ block: 'nearest' });
        } else {
            suggestion.classList.remove('bg-white/20');
        }
    });
}

// Select a city from suggestions
function selectCity(city) {
    cityInput.value = `${city.name}, ${city.sys.country}`;
    hideSuggestions();
    getWeatherData(`${city.name}, ${city.sys.country}`);
}

// Hide suggestions dropdown
function hideSuggestions() {
    citySuggestions.classList.add("hidden");
    currentSuggestions = [];
    selectedSuggestionIndex = -1;
}

// Main search function
async function getWeatherData(city) {
    try {
        showLoading();
        hideError();
        clearWeatherData();
        
        // Fetch current weather and forecast data
        const [currentWeather, forecast] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);
        
        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
        hideLoading();
        
    } catch (err) {
        console.error("Error fetching weather data:", err);
        showError("Failed to fetch weather data. Please check the city name and try again.");
        hideLoading();
    }
}

// Fetch current weather data
async function fetchCurrentWeather(city) {
    const response = await fetch(
        `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
    }
    
    return await response.json();
}

// Fetch 5-day forecast data
async function fetchForecast(city) {
    const response = await fetch(
        `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
    }
    
    return await response.json();
}

// Display current weather information
function displayCurrentWeather(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].icon);
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const cityName = data.name;
    const country = data.sys.country;
    
    weatherInfo.innerHTML = `
        <div class="animate-slide-up">
            <div class="flex items-center justify-center mb-4">
                <div class="weather-icon text-6xl mr-4">${weatherIcon}</div>
                <div class="text-left">
                    <h3 class="text-3xl font-bold text-gray-800">${temperature}°C</h3>
                    <p class="text-lg text-gray-600 capitalize">${description}</p>
                    <p class="text-sm text-gray-500">${cityName}, ${country}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="bg-white/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-semibold text-gray-800">${feelsLike}°C</div>
                    <div class="text-sm text-gray-600">Feels like</div>
                </div>
                <div class="bg-white/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-semibold text-gray-800">${humidity}%</div>
                    <div class="text-sm text-gray-600">Humidity</div>
                </div>
                <div class="bg-white/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-semibold text-gray-800">${windSpeed} m/s</div>
                    <div class="text-sm text-gray-600">Wind Speed</div>
                </div>
                <div class="bg-white/50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-semibold text-gray-800">${data.main.pressure} hPa</div>
                    <div class="text-sm text-gray-600">Pressure</div>
                </div>
            </div>
        </div>
    `;
}

// Display 5-day forecast
function displayForecast(data) {
    // Group forecast by day and take the first forecast of each day
    const dailyForecasts = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });
    
    const forecastDays = Object.values(dailyForecasts).slice(0, 5);
    
    forecastInfo.innerHTML = forecastDays.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const weatherIcon = getWeatherIcon(day.weather[0].icon);
        const maxTemp = Math.round(day.main.temp_max);
        const minTemp = Math.round(day.main.temp_min);
        const description = day.weather[0].description;
        
        return `
            <div class="bg-white/50 rounded-lg p-4 text-center animate-slide-up">
                <div class="text-sm font-medium text-gray-600 mb-2">${dayName}</div>
                <div class="weather-icon text-3xl mb-2">${weatherIcon}</div>
                <div class="text-lg font-semibold text-gray-800">${maxTemp}°</div>
                <div class="text-sm text-gray-600">${minTemp}°</div>
                <div class="text-xs text-gray-500 capitalize mt-1">${description}</div>
            </div>
        `;
    }).join('');
}

// Get weather icon based on OpenWeatherMap icon code
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
}

// Utility functions
function showLoading() {
    loading.style.display = "block";
}

function hideLoading() {
    loading.style.display = "none";
}

function showError(message) {
    error.querySelector('p').textContent = message;
    error.style.display = "block";
}

function hideError() {
    error.style.display = "none";
}

function clearWeatherData() {
    weatherInfo.innerHTML = "";
    forecastInfo.innerHTML = "";
}
