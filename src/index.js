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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//

function showTemperature(response) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  let weatherIcon = document.querySelector("#icon");
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature} `;
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;

  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let units = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
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

let currentTemp = document.querySelector("#current-button");
currentTemp.addEventListener("click", CurrentPosition);
let weatherForm = document.querySelector("#search-form");
weatherForm.addEventListener("click", showCity);
