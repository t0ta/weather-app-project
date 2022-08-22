let apiKey = "5b4060dc448ce090c0895c5c8af48e68";
let units = "metric";
let apiUrlBase = `https://api.openweathermap.org/data/2.5/weather?`;

let currentTime = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function showTime() {
  let currentDate = currentTime.getDate();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let date = document.querySelector("#current-date");
  date.innerHTML = currentDate;
  let month = document.querySelector("#current-month");
  month.innerHTML = `${currentMonth}, ${currentDay}`;
  let time = document.querySelector("#exact-time");
  time.innerHTML = `Time ${currentHour}:${currentMinutes}`;
}
showTime();

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}℃`;

  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feels-like");
  currentFeelsLike.innerHTML = `${feelsLike}℃`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind} mps`;

  let currentCity = response.data.name;
  let showCurrentCity = document.querySelector("#current-city");
  showCurrentCity.innerHTML = currentCity;
}

function searchCity(city) {
  let apiUrl = `${apiUrlBase}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#serch-text-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${apiUrlBase}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let form = document.querySelector("#serch-form");
form.addEventListener("submit", submitCity);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

searchCity("Lisbon");
