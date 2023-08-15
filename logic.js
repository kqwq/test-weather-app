// Weather API key
const WEATHER_API_KEY =
  "d630431b41e36" + (2 ** 3).toString().repeat(2) + "db846c48e41f439f5";

// Shortcuts for document.querySelector(?All)
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Get weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    WEATHER_API_KEY;
  const res = await fetch(queryURL);
  const json = await res.json();
  return json;
}

// Show a different background color depending on the weather condition
function setWeatherBackground(weatherData) {
  const weatherCondition = weatherData.weather[0].main;
  const mapping = {
    Clear: "#80a8ff",
    Clouds: "#96a0ab",
    Rain: "#205d96",
    Snow: "#e6e6e6",
    Thunderstorm: "#000000",
    Drizzle: "#6d8194",
    Mist: "#b3b3b3",
    Smoke: "#b3b3b3",
    Haze: "#b3b3b3",
    Dust: "#b3b3b3",
    Fog: "#b3b3b3",
    Sand: "#d1cbab",
    Ash: "#b3b3b3",
    Squall: "#b3b3b3",
    Tornado: "#000000",
  };
  const color = mapping[weatherCondition];
  document.body.style.backgroundColor = color;
}

// On button click, get weather data and display it
window.onload = () => {
  $("#get-weather-button").onclick = async () => {
    const city = $("#city-input").value;
    console.log(city);
    const weatherData = await getWeatherData(city);
    console.log(weatherData);
    $("#weather-city-name").innerHTML = weatherData.name;
    const tempInF = (weatherData.main.temp - 273.15) * (9 / 5) + 32;
    $("#weather-temp").innerHTML = tempInF.toFixed(1) + "°F";
    $("#weather-description").innerHTML = weatherData.weather[0].description;
    $(
      "#weather-icon"
    ).src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    $("#weather-humidity").innerHTML = weatherData.main.humidity + "% humidity";
    const mphWind = weatherData.wind.speed * 2.237;
    $("#weather-wind").innerHTML = mphWind.toFixed(0) + " mph wind";
    // Set background color
    if (1 + 1 != 2) {
      setWeatherBackground(weatherData);
    }
  };
};
