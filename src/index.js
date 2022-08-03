let units = "metric";
let apiKey = "6f07b0316854b26534479a312e2df61c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
let temperatureValueElement = document.querySelector(".temperature");
let cityElement = document.querySelector(".city");
let celsiusTemperature = null;

function displayFormatedDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let numberOfDay = date.getDay();
  let day = days[numberOfDay];
  return day;
}

function displayForecastWeather(response) {
  let forecastElement = document.querySelector(".weather-forecast");
  let forecast = response.data.daily;
  let forecastHTMLCode = `<div class="row">`;
  forecast.forEach(function (forecastDayWeather, index) {
    if (index < 6) {
      forecastHTMLCode =
        forecastHTMLCode +
        `<div class="col-2">
      <div class="forecast-date">${displayFormatedDay(
        forecastDayWeather.dt
      )} </div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDayWeather.weather[0].icon
      }@2x.png"
            alt=""
            class="forecast-icon"
            width="42"
            />
            <div class="forecast-temperature">
            <span class="temperature-max"> ${Math.round(
              forecastDayWeather.temp.max
            )}°</span>
            <span class="temperature-min">${Math.round(
              forecastDayWeather.temp.min
            )}°</span>
            </div>
            </div>`;
    }
  });

  forecastHTMLCode = forecastHTMLCode + `</div>`;
  forecastElement.innerHTML = forecastHTMLCode;
}

function getForecasetByCoord(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(forecastApiURL).then(displayForecastWeather);
}

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureValueElement.innerHTML = celsiusTemperature;
  cityElement.innerHTML = response.data.name;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  let getIconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${getIconCode}@2x.png`;
  iconElement.setAttribute("src", iconUrl);

  getForecasetByCoord(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  if (city.length <= 0) {
    alert("Please enter a city");
    return;
  }

  let apiEndpointByCity = `${apiUrl}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiEndpointByCity).then(showTemperature);
}

function searchDefaulCitytWeather(city) {
  let apiEndpointByCity = `${apiUrl}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiEndpointByCity).then(showTemperature);
}
searchDefaulCitytWeather("Cherkasy");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = Math.round(celsiusTemperature * 1.8 + 32);
  temperatureValueElement.innerHTML = temperatureFahrenheit;
  convertToFahrenheitTemperature.classList.add("active");
  convertToCelsiusTemperature.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureValueElement.innerHTML = celsiusTemperature;
  convertToCelsiusTemperature.classList.add("active");
  convertToFahrenheitTemperature.classList.remove("active");
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("submit", search);

let convertToFahrenheitTemperature = document.querySelector("#fahrenheit");
convertToFahrenheitTemperature.addEventListener("click", convertToFahrenheit);

let convertToCelsiusTemperature = document.querySelector("#celsius");
convertToCelsiusTemperature.addEventListener("click", convertToCelsius);

//Date&Time

let now = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

//hours
let hours = now.getHours();

if (hours < 10) {
  hours = "0" + hours;
}

//minutes
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let dayAndTimeNow = document.querySelector(".day-time");
dayAndTimeNow.innerHTML = `${day} ${hours} : ${minutes}`;
