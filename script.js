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

let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let weatherNow = document.querySelector("#weatherNow");
weatherNow.innerHTML = `${hours}:${minutes} | ${day}, ${month} ${date}`;

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
let button = document.querySelector(".search-button");

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#tempNum").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

button.addEventListener("click", displayCity);
function displayCity() {
  let apiKey = "3cae5d2a22ddfbae361da9e3bc9faa10";
  let city = document.querySelector(".search-bar").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCurrentLocation(position) {
  let apiKey = "3cae5d2a22ddfbae361da9e3bc9faa10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let locationBtn = document.querySelector("#locationBtn");
locationBtn.addEventListener("click", getCurrentLocation);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it,
//  it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", toCelcius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let temperature = document.querySelector("#tempNum");
let celciusBool = true;

function toFahrenheit() {
  let tempValue = document.querySelector("#tempNum").textContent;
  let newTemp = Math.round((parseInt(tempValue) * 9) / 5 + 32);
  if (celciusBool) {
    temperature.innerHTML = newTemp;
  }
  celciusBool = false;
}

function toCelcius() {
  let tempValue = document.querySelector("#tempNum").textContent;
  let newTemp = Math.round(((parseInt(tempValue) - 32) * 5) / 9);
  if (!celciusBool) {
    temperature.innerHTML = newTemp;
  }
  celciusBool = true;
}
