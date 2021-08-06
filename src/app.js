//Time & Date
function currentDay(dayAndTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[dayAndTime.getDay()];
  let currentMinutes = dayAndTime.getMinutes();
  let currentHour = dayAndTime.getHours();
  let ampm = currentHour >= 12 ? "PM" : "AM";

  currentHour = currentHour % 12;
  currentHour = currentHour ? currentHour : 12;
  currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;

  let sentence = `${currentDay} ${currentHour}:${currentMinutes}${ampm}`;

  return sentence;
}
function currentDate(date) {
  let month = [
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

  let currentMonth = month[date.getMonth()];
  let currentDay = date.getDate();
  let currentYear = date.getFullYear();

  let sentence = `${currentMonth} ${currentDay}, ${currentYear}`;

  return sentence;
}

let today = new Date();
let dayAndTime = document.querySelector("#day-time");
dayAndTime.innerHTML = currentDay(today);
let date = document.querySelector("#date");
date.innerHTML = currentDate(today);

// Unit change
function changeUnitFahrenheit(event) {
  event.preventDefault();
  let temperatureElementCelsius = document.querySelector("#celsius-today");
  let unitCelsius = document.querySelector("#celsius-link");
  let temperatureToFahrenheit = temperatureElementCelsius.innerHTML;
  temperatureToFahrenheit = Number(temperatureToFahrenheit);
  temperatureElementCelsius.innerHTML = Math.round(
    (temperatureToFahrenheit * 9) / 5 + 32
  );
  unitCelsius.innerHTML = "°F";

  let temperatureElementFahrenheit =
    document.querySelector("#fahrenheit-today");
  let unitFahrenheit = document.querySelector("#fahrenheit-link");
  let temperatureToCelsius = temperatureElementFahrenheit.innerHTML;
  temperatureToCelsius = Number(temperatureToCelsius);
  temperatureElementFahrenheit.innerHTML = Math.round(
    ((temperatureToCelsius - 32) * 5) / 9
  );
  unitFahrenheit.innerHTML = "°C";
}
function changeUnitCelsius(event) {
  event.preventDefault();
  let temperatureElementCelsius = document.querySelector("#celsius-today");
  let unitCelsius = document.querySelector("#celsius-link");
  let temperatureToFahrenheit = temperatureElementCelsius.innerHTML;
  temperatureToFahrenheit = Number(temperatureToFahrenheit);
  temperatureElementCelsius.innerHTML = Math.round(
    ((temperatureToFahrenheit - 32) * 5) / 9
  );
  unitCelsius.innerHTML = "°C";

  let temperatureElementFahrenheit =
    document.querySelector("#fahrenheit-today");
  let unitFahrenheit = document.querySelector("#fahrenheit-link");
  let temperatureToCelsius = temperatureElementFahrenheit.innerHTML;
  temperatureToCelsius = Number(temperatureToCelsius);
  temperatureElementFahrenheit.innerHTML = Math.round(
    (temperatureToCelsius * 9) / 5 + 32
  );
  unitFahrenheit.innerHTML = "°F";
}
function changeUnitForecastFahrenheit(event) {
  event.preventDefault();

  let temperatureToFahrenheit = document
    .querySelectorAll(".forecast-temp")
    .forEach((changeUnit) => {
      let temp = changeUnit.innerHTML;
      temp = Number(temp);
      changeUnit.innerHTML = Math.round((temp * 9) / 5 + 32);
    });
  return temperatureToFahrenheit;
}
function changeUnitForecastCelsius(event) {
  event.preventDefault();

  let temperatureToCelsius = document
    .querySelectorAll(".forecast-temp")
    .forEach((changeUnit) => {
      let temp = changeUnit.innerHTML;
      temp = Number(temp);
      changeUnit.innerHTML = Math.round(((temp - 32) * 5) / 9);
    });
  return temperatureToCelsius;
}
let fahrenheitLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", changeUnitFahrenheit);
let celsiusLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", changeUnitCelsius);

document
  .querySelectorAll(".fahrenheit-link")
  .forEach((fahrenheitForecastLink) => {
    fahrenheitForecastLink.addEventListener(
      "click",
      changeUnitForecastFahrenheit
    );
  });

document.querySelectorAll(".celsius-link").forEach((celsiusForecastLink) => {
  celsiusForecastLink.addEventListener("click", changeUnitForecastCelsius);
});

//API search

function displayTemperature(response) {
  let name = document.querySelector("#city");
  let celsius = document.querySelector("#celsius-today");
  let fahrenheit = document.querySelector("#fahrenheit-today");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  let smallIcon = document.querySelector(".small-weather-icon");

  let city = response.data.name;
  let country = response.data.sys.country;
  name.innerHTML = `${city}, ${country}`;

  let temperature = Number(Math.round(response.data.main.temp));
  celsius.innerHTML = temperature;

  temperature = Math.round((temperature * 9) / 5 + 32);
  fahrenheit.innerHTML = temperature;

  description.innerHTML = response.data.weather[0].description;

  humidity.innerHTML = response.data.main.humidity;

  wind.innerHTML = Number(Math.round(response.data.wind.speed * 3.6));

  icon.setAttribute("src", `media/01d.svg`);
  icon.setAttribute("src", `media/${response.data.weather[0].icon}.svg`);
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "5e875644b7a30ea03214c53a00044885";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-bar");
  search(searchedCity.value);
}

search("Fulda");

let searchTemp = document.querySelector("#search-form");
searchTemp.addEventListener("submit", handleSubmit);
