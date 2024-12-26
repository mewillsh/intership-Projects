document.getElementById('get-weather-btn').addEventListener('click', function () {
    const city = document.getElementById('location-input').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Geocode city to latitude and longitude using OpenCage API (or similar)
    const geocodeApiKey = 'YOUR_GEOCODING_API_KEY';  // Replace with your Geocoding API key
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geocodeApiKey}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const lat = data.results[0].geometry.lat;
                const lon = data.results[0].geometry.lng;

                // Once we have the latitude and longitude, fetch weather data from MeteoBlue
                fetchWeatherData(lat, lon);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            console.error('Error with geocoding:', error);
            alert('There was an error fetching location data.');
        });
});

function fetchWeatherData(lat, lon) {
    const apiKey = 'vt4lOaZ1eh2uW0Qp';  // Your MeteoBlue API key
    const apiUrl = `https://my.meteoblue.com/packages/current?apikey=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('MeteoBlue Weather Data:', data);

            if (data && data.current) {
                const weather = data.current;
                const temperature = weather.temperature;
                const description = weather.weathercode_description;
                const windSpeed = weather.wind_speed;
                const humidity = weather.humidity;
                const iconCode = weather.icon_code;  // Use the icon code for weather icons

                // Construct the icon URL based on MeteoBlue's icon system
                const iconUrl = `https://www.meteoblue.com/en/weather-forecast/icon/${iconCode}.png`;

                // Update the HTML with the fetched data
                document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
                document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
                document.getElementById('weather-description').textContent = `Description: ${description}`;
                document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;
                document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
                document.getElementById('weather-icon').src = iconUrl;

                // Show weather card with smooth animation
                document.getElementById('weather-card').style.animation = 'scaleIn 0.5s ease forwards';
            } else {
                alert('Weather data not available.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data from MeteoBlue:', error);
            alert('There was an error fetching the weather data.');
        });
}
