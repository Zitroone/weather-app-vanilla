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

//Forecast
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecast">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img src="media/${
                forecastDay.weather[0].icon
              }.svg" alt="rain" class="small-weather-icon" />
              <span class="forecast-temp">${Math.round(
                forecastDay.temp.max
              )}</span><span class="forecast-unit"> °C</span>
              <br />
              <small>Rainy</small>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//API search

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "5e875644b7a30ea03214c53a00044885";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

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

  celsiusTemperature = response.data.main.temp;
  fahrenheitTemperature = response.data.main.temp;

  let temperature = Number(Math.round(celsiusTemperature));
  celsius.innerHTML = temperature;

  temperature = Math.round((temperature * 9) / 5 + 32);
  fahrenheit.innerHTML = temperature;

  description.innerHTML = response.data.weather[0].description;

  humidity.innerHTML = response.data.main.humidity;

  wind.innerHTML = Number(Math.round(response.data.wind.speed * 3.6));

  icon.setAttribute("src", `media/01d.svg`);
  icon.setAttribute("src", `media/${response.data.weather[0].icon}.svg`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

let searchTemp = document.querySelector("#search-form");
searchTemp.addEventListener("submit", handleSubmit);

// Unit change
function changeUnitFahrenheit(event) {
  event.preventDefault();
  let temperatureElementCelsius = document.querySelector("#celsius-today");
  let unitCelsius = document.querySelector("#celsius-link");
  temperatureElementCelsius.innerHTML = Number(
    Math.round((celsiusTemperature * 9) / 5 + 32)
  );
  unitCelsius.innerHTML = "°F";

  let temperatureElementFahrenheit =
    document.querySelector("#fahrenheit-today");
  let unitFahrenheit = document.querySelector("#fahrenheit-link");
  temperatureElementFahrenheit.innerHTML = Number(
    Math.round(fahrenheitTemperature)
  );

  unitFahrenheit.innerHTML = "°C";
}
function changeUnitCelsius(event) {
  event.preventDefault();
  let temperatureElementCelsius = document.querySelector("#celsius-today");
  let unitCelsius = document.querySelector("#celsius-link");
  temperatureElementCelsius.innerHTML = Number(
    Math.round(fahrenheitTemperature)
  );
  unitCelsius.innerHTML = "°C";

  let temperatureElementFahrenheit =
    document.querySelector("#fahrenheit-today");
  let unitFahrenheit = document.querySelector("#fahrenheit-link");
  temperatureElementFahrenheit.innerHTML = Number(
    Math.round((celsiusTemperature * 9) / 5 + 32)
  );
  unitFahrenheit.innerHTML = "°F";
}

let fahrenheitLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", changeUnitFahrenheit);
let celsiusLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", changeUnitCelsius);

let celsiusTemperature = null;
let fahrenheitTemperature = null;

search("Fulda");
