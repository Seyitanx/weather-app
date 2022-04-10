function newDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
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
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
  ];

return days[day];

}




function displayForecast(response) {
  let newForecast= response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

newForecast.forEach(function(forecastDay, index){
if (index < 7){
forecastHTML =
  forecastHTML +
  `
            <div class="col-sm-4" style="width: 8rem">
              <div class="card">
                <div class="card-body" >
                  <h5 class="card-day">${displayDay(forecastDay.dt)}</h5>
                  <p class="card-temperature">${Math.round(forecastDay.temp.max)}℃</p>
                  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width = "42">
                </div>
              </div>
            </div>
  `;
}
}) 
  forecastHTML = forecastHTML + `<div>`;
  forecast.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  console.log(coordinates)
  let appkey = "766d0f1b246ebf2848cd1e96c9ac9190";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appkey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//this function is to ensure the city name returns after input in the search form
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let searchInput = document.querySelector("#search-input");
  city.innerHTML = searchInput.value;
  let appiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  let appKey = "766d0f1b246ebf2848cd1e96c9ac9190";
  axios.get(`${appiUrl}&appid=${appKey}`).then(getLocation);
}

function getLocation(response) {
  let currentCity = document.querySelector("#current-city");
  let currentDegree = document.querySelector("#current-degree");
  let weather = document.querySelector("#cloud-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#the-date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentDegree.innerHTML = Math.round(celsiusTemperature);
  weather.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = newDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}

function searchButton(city) {
  let appiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let appKey = "766d0f1b246ebf2848cd1e96c9ac9190";
  axios.get(`${appiUrl}&appid=${appKey}`).then(getLocation);
}
//bonus feature which incolved adding an extra button
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let appiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let appKey = "766d0f1b246ebf2848cd1e96c9ac9190";
  axios.get(`${appiUrl}&appid=${appKey}`).then(getLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getPosition);


searchButton("lagos");

