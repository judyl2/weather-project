let now = new Date();

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
let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
	hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

let h3 = document.querySelector("#date-time");
h3.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minutes}`;

function search(event) {
	event.preventDefault();
	let units = "metric";
	let locationInput = document.querySelector("#search-input");
	let cityName = locationInput.value;
	let locationElement = document.querySelector("#location");
	locationElement.innerHTML = cityName;
	let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(showTemp);
	axios.get(apiUrl).then(showWeatherDes);
}

function showTemp(response) {
	//console.log(response);
	let currentTemp = Math.round(response.data.main.temp);
	let tempDisplay = document.querySelector("#temp-display");
	tempDisplay.innerHTML = currentTemp;
}
function showWeatherDes(response) {
	let description = response.data.weather[0].description;
	document.querySelector("#weather-description").innerHTML = description;
}

let searchCity = document.querySelector("#search-bar");
searchCity.addEventListener("submit", search);

//bonus challenge:
function showGeo(response) {
	let temp = Math.round(response.data.main.temp);
	document.getElementById("temp-display").innerHTML = temp;

	document.getElementById("location").innerHTML = "Your Location";
}
function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	axios.get(url).then(showGeo);
	console.log(position);
}

function geolocation() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

let searchCurrent = document.querySelector("#current");
searchCurrent.addEventListener("click", geolocation);
