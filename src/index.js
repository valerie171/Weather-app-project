let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dates = document.querySelector("#date");
dates.innerHTML = `${currentDay} ${hour}:${minutes} `;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="date">${formatDay(dailyForecastDay.dt)}</div>
                
                <img src="http://openweathermap.org/img/wn/${
                  dailyForecastDay.weather[0].icon
                }@2x.png" alt="" width="50" />
                <div class="temperatures">
                  <span class="temp-max">${Math.round(
                    dailyForecastDay.temp.max
                  )}°C |</span>
                  <span class="temp-min">${Math.round(
                    dailyForecastDay.temp.min
                  )}°C</span>
                </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}


function showTemperature(response) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  celsiusTemperature = Math.round(response.data.main.temp);
  let weatherIcon = document.querySelector("#icon");
  let mainTemp = document.querySelector("#main-temp");
  currentCity.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;

  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = celsiusTemperature * 1.8 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  temperature.innerHTML = celsiusTemperature;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemp);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTemp);
//



function showCity(city) {
  
  

  let units = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  showCity(searchInput.value);
}

function showLocation(position) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function CurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let currentTemp = document.querySelector("#current-button");
currentTemp.addEventListener("click", CurrentPosition);
let weatherForm = document.querySelector("#search-form");
weatherForm.addEventListener("click", showCity);
showCity("Malaga");
showForecast();
