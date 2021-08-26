function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4a4a95a1db5242c6c908fa1c31b680b9c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  //let lat = position.coords.latitude;
  //let lon = position.coords.longitude;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperture(response) {
  let mainTemperture = document.querySelector("#main-temperture");
  let mainCity = document.querySelector("#city");
  let mainDescription = document.querySelector("#main-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  //double check icon
  let mainIcon = document.querySelector("#main-icon");
  // let getIcon = response.data.weather[0].icon;

  celsiusTemperture = response.data.main.temperture;

  mainTemperture.innerHTML = Math.round(celsiusTemperture);
  mainCity.innerHTML = response.data.name;
  mainDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  mainIcon.setAttribute("alt", response.data.weather[0].description);
  date.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4a4a95a1db5242c6c908fa1c31b680b9c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperture);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

//function getPosition(position) {
// let apiKey = "4a4a95a1db5242c6c908fa1c31b680b9c";
// let lat = position.coords.latitude;
// let lon = position.coords.longitude;
// let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//  axios.get(url).then(displayTemperture); }

// function getCurrentLocation() {
//  navigator.geolocation.getCurrentPosition(getPosition);}

//let locationButton = document.querySelector("#location");
//locationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperture * 9) / 5 + 32;
  let mainTemperture = document.querySelector("#main-temperture");
  mainTemperture.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let mainTemperture = document.querySelector("#main-temperture");
  mainTemperture.innerHTML = Math.round(celsiusTemperture);
}

let celsiusTemperture = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Seoul");
