let units = "metric";
let apiKey = "6f07b0316854b26534479a312e2df61c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
let tempValueElement = document.querySelector(".temperature");
let cityElement = document.querySelector(".city");

function showTemperature(response) {
  console.log("Response data:", response.data);
  let temperature = Math.round(response.data.main.temp);
  tempValueElement.innerHTML = temperature;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  console.log(searchInputElement);
  let city = searchInputElement.value;
  console.log(city);

  if (city.length > 0) {
    cityElement.innerHTML = city;
  } else {
    alert("Enter your city name");
    return;
  }

  let apiEndpointByCity = `${apiUrl}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiEndpointByCity).then(showTemperature);
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("submit", search);

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
