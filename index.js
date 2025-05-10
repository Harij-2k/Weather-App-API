const apikey = "40b1ced9e32414b83a69d4a78b6d8603";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.Value;
    getWeatherData(cityValue);

});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed}m/s`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((details) => `  <div>${details}</div>`).join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An Error Happened, Please Try gain Later";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }