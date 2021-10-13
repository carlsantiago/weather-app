var userInput = document.querySelector('#inputCity')
var button = document.querySelector('.search-btn')
var dateHtml = document.querySelector('.date')
var cityHtml = document.querySelector('.city-name')
var tempHtml = document.querySelector('.temp')
var windHtml = document.querySelector('.wind')
var humidityHtml = document.querySelector('.humidity')
var uvHtml = document.querySelector('.uv')
var key = "&appid=294893130f9503ab3af461b6a81901e4"

var cityApi = "https://api.openweathermap.org/data/2.5/weather?q="
var oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?"
var metric = "&units=metric"



var oneCall = function (lat,lon) {
    var one = oneCallApi + "lat=" + lat + "&lon=" + lon + metric + key

    fetch (one)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // var dt = data.current.dt
                // var date = new Date(dt * 1000)
                // dateHtml.textContent = date
                cityHtml.textContent = userInput.value
                tempHtml.textContent = "Temperature: " + data.current.temp + " °C"
                var windSpeed = Math.round(data.current.wind_speed * 3.6)
                windHtml.textContent = "Wind: " + windSpeed + " km/h"
                humidityHtml.textContent = "Humidity: " + data.current.humidity + "%"
                uvHtml.textContent = "UV Index: " + data.current.uvi
                console.log (data)
            })

        }
    })
   
}


var getData = function (cityName) {
    var city = cityApi + userInput.value + key;

    fetch(city)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat
                var lon = data.coord.lon
                oneCall(lat,lon);
            })
        } else {
            console.log("Invalid City Name")
        }
    })
}


button.addEventListener('click',getData);

