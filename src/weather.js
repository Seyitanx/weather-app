function newDate(date) {
  let days = [
    "Suday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentTime = ("0" + now.getHours()).slice(-2);
  let currentDay = days[now.getDay()];
  let currentMins = ("0" + now.getMinutes()).slice(-2);
  let fullDate = `${currentDay} ${currentTime}:${currentMins}`;
  return fullDate;
}

let now = new Date();
let timeDate = document.querySelector("#the-date");
timeDate.innerHTML = newDate(now);

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
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = `${temperature}`;
  let weather = document.querySelector("#cloud-description");
  weather.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML= Math.round(response.data. wind.speed);
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
searchButton("lagos")