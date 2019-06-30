// show Location
let btn1=document.querySelector('.lng__lat');
let btn2 = document.querySelector('.loc');
let btn3=document.querySelector('.get__weather');
let btn4=document.querySelector('.weather__show');
btn2.addEventListener('click', initMap);
btn1.addEventListener('click', geoFindMe);
let output = document.getElementById("out");
let lat;
let lng;
function geoFindMe() {
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        lat = latitude;
        lng = longitude;
        console.log(longitude);
        console.log(latitude);
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
}

function initMap() {
    let options = {
        center: {lat: lat, lng: lng},
        zoom: 18,
    };
    let map = new google.maps.Map(document.getElementById("map"), options);
}


//weather

const API_KEY = '37c550e61f6f3e0494726d44416a2ffc';
btn3.addEventListener('click', gettingWeather);
btn4.addEventListener('click', showWeather);
let weatherData = {};

function gettingWeather() {
    const api_url = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
        .then(function (response) {
            return response.json();
        }).then(data => weatherData = data);
    console.log(weatherData);
}

function showWeather() {
    if (weatherData.main.temp-(273.15)>=30) {
        let showWeatherBox = document.querySelector('.show__weather');
        let location=document.querySelector('.your__location');
        let temperature=document.querySelector('.your__region__temperature');
        let img = new Image();
        img.src = "img/sun.jpg";
        showWeatherBox.insertBefore(img,showWeather.lastChild);
        location.innerHTML=(`Your location is ${weatherData.name}`);
        temperature.innerHTML=(`outside temperature ${weatherData.main.temp-(273.15)}degrees Celsius`)
    }
    else if(weatherData.main.temp-(273.15)>=10&&weatherData.main.temp-(273.15)<30) {
        let showWeatherBox = document.querySelector('.show__weather');
        let location=document.querySelector('.your__location');
        let temperature=document.querySelector('.your__region__temperature');
        let img = new Image();
        img.src = "img/cloudy.jpg";
        showWeatherBox.insertBefore(img,showWeather.lastChild);
        location.innerHTML=(`Your location is ${weatherData.name}`);
        temperature.innerHTML=(`outside temperature ${weatherData.main.temp-(273.15)}degrees Celsius`)
    }else{
        console.log('Ah shit here we go again');
    }
}