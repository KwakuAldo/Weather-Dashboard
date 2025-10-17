# 🌤️ Weather Dashboard

A modern, responsive weather dashboard built with vanilla JavaScript and Tailwind CSS. Get current weather conditions and 5-day forecasts for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/Weather-Dashboard-blue?style=for-the-badge&logo=weather)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌍 **Global Weather Data** - Search for weather in any city worldwide
- 🌡️ **Current Weather** - Temperature, humidity, wind speed, pressure, and more
- 📅 **5-Day Forecast** - Extended weather predictions with daily summaries
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⌨️ **Keyboard Support** - Press Enter to search
- 🎨 **Modern UI** - Beautiful gradient backgrounds and smooth animations
- ⚡ **Fast Loading** - Optimized for quick data retrieval
- 🔒 **Secure** - API key configuration with environment variables

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- Node.js (for development)
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenWeatherMap API key
   ```

4. **Build the CSS** (for development)
   ```bash
   npm run build-css
   ```

5. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

## 🛠️ Development

### Available Scripts

- `npm run build-css` - Build CSS with Tailwind (watch mode)
- `npm run build-css-prod` - Build production CSS (minified)

### Project Structure

```
weather-dashboard/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── config.js           # API configuration
├── style.css           # Compiled CSS
├── src/
│   └── input.css       # Tailwind CSS source
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🌐 API Integration

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data:

- **Current Weather API** - Real-time weather conditions
- **5-Day Forecast API** - Extended weather predictions
- **Free tier available** - 1000 calls/day

### API Endpoints Used

- `GET /weather` - Current weather data
- `GET /forecast` - 5-day weather forecast

## 🎨 Customization

### Colors

The dashboard uses a custom color scheme defined in `tailwind.config.js`:

```javascript
colors: {
  'weather-blue': '#3B82F6',
  'weather-dark': '#1E293B',
  'weather-light': '#F8FAFC',
}
```

### Styling

- **Tailwind CSS** for utility-first styling
- **Custom components** in `src/input.css`
- **Responsive design** with mobile-first approach
- **Smooth animations** and transitions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Inter Font](https://fonts.google.com/specimen/Inter) for the beautiful typography

## 📞 Support

If you have any questions or run into issues, please:

1. Check the [Issues](https://github.com/yourusername/weather-dashboard/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

Made with ❤️ by [Your Name](https://github.com/yourusername)