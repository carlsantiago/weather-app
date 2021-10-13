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
var icon = " http://openweathermap.org/img/wn/"



var oneCall = function (lat,lon,) {
    var one = oneCallApi + "lat=" + lat + "&lon=" + lon + metric + key

    fetch (one)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var date = moment().format("dddd, MMMM Do YYYY");
              
                dateHtml.textContent = date
                tempHtml.textContent = "Temperature: " + data.current.temp + " °C"
                var windSpeed = Math.round(data.current.wind_speed * 3.6)
                windHtml.textContent = "Wind: " + windSpeed + " km/h"
                humidityHtml.textContent = "Humidity: " + data.current.humidity + "%"
                uvHtml.textContent = "UV Index: " + data.current.uvi
                var icon1 = icon + data.current.weather[0].icon
                document.getElementById("current-icon").src=icon1 + "@4x.png"
                console.log (data)
                console.log(data.current.weather[0].icon)
               
            })

        }
    })
   
}


var getData = function () {

    var city = cityApi + userInput.value + key;

    fetch(city)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var user = function(s){
                    var x = s[0].toUpperCase()+s.slice(1);
                    cityHtml.textContent = x
                }
                user(userInput.value)
                var lat = data.coord.lat
                var lon = data.coord.lon
                oneCall(lat,lon);
            })
        } else {
            console.log("Invalid City Name")
        }
    })
}


var init = function (){
    var getIP = 'https://ipwhois.app/json/'
    fetch(getIP)
    .then(function (response){
        response.json().then(function (data){
            var lat = data.latitude
            var lon = data.longitude
            cityHtml.textContent = "Your current location: " +data.city
            console.log(lon)
            oneCall(lat,lon)
 
        })

    })
}

button.addEventListener('click',getData);
init()
