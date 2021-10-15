var userInput = document.querySelector('#inputCity')
var button = document.querySelector('.search-btn')
var dateHtml = document.querySelector('.date')
var cityHtml = document.querySelector('.city-name')
var tempHtml = document.querySelector('.temp')
var windHtml = document.querySelector('.wind')
var humidityHtml = document.querySelector('.humidity')
var uvHtml = document.querySelector('.uv')
var currentHTML = document.querySelector('.current')
var imgDiv = document.getElementById('currentIcon')
var key = "&appid=294893130f9503ab3af461b6a81901e4"

var cityApi = "https://api.openweathermap.org/data/2.5/weather?q="
var oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?"
var metric = "&units=metric"
var icon = "https://openweathermap.org/img/wn/"


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
                var img = document.createElement('img');
                img.setAttribute("src", icon + data.current.weather[0].icon + "@4x.png")
                img.setAttribute("id", "icon")
                imgDiv.appendChild(img);

                console.log (data)
                fiveDay(data)
                console.log(data.current.weather[0].icon)
            })
        }
    })
}

var fiveDay = function (data) {
    var fiveEl = document.querySelector('.five')
    fiveEl.textContent = '';

    for (var x = 0; x < 5; x++){

        var div = document.createElement('div');
        div.classList = 'fiveCard card bg-dark col-12 col-sm-6 col-lg-4 mb-1'

        var table = document.createElement('table');
        table.classList = 'card-table table text-white'

        var thead = document.createElement('thead');
        var tr1 = document.createElement('tr');
        var th1  = document.createElement('th');
        th1.setAttribute("scope", "col");

        var date = moment().add(x+1,'d').format("Do, MMMM")
   

     
        th1.textContent = date
        tr1.appendChild(th1)
        thead.appendChild(tr1)
        table.appendChild(thead)

        // Create tbody and image td
        var tbody = document.createElement('tbody');
        var tr2 = document.createElement('tr');
        var tdImg = document.createElement('td');
        tdImg.setAttribute("rowspan", "3")

        //Create img icon
        var img = document.createElement('img');
        img.setAttribute("src", icon + data.daily[x].weather[0].icon + "@2x.png")
        tdImg.appendChild(img);
        
        //Create Temp
        var tdTemp = document.createElement('td');
        tdTemp.textContent = "Temp: " + data.daily[x].temp.day + " °C"
        tr2.appendChild(tdImg);
        tr2.appendChild(tdTemp);
        tbody.appendChild(tr2)


        //Create wind TD
        var tr3 = document.createElement('tr');
        var tdWind = document.createElement('td');
        var windSpeed = Math.round(data.daily[x].wind_speed * 3.6)
        tdWind.textContent = "Wind: " + windSpeed + " km/h"
        tr3.appendChild(tdWind)
        tbody.appendChild(tr3)

        //Create humidity TD
        var tr4 = document.createElement('tr');
        var tdHumidity = document.createElement('td')
        tdHumidity.textContent = "Humidity " + data.daily[x].humidity + "%"
        tr4.appendChild(tdHumidity)
        tbody.appendChild(tr4)

        table.appendChild(tbody);
        fiveEl.appendChild(div)
        div.appendChild(table)
    }
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
            alert("Invalid City Name")
        }
    })
}

// Get IP location
var ipLocation = function (){
    var getIP = 'https://ipwhois.app/json/'
    fetch(getIP)
    .then(function (response){
        response.json().then(function (data){
            tempHtml.textContent = '';
            windHtml.textContent = '';
            humidityHtml.textContent = '';
            uvHtml.textContent = '';

            var lat = data.latitude
            var lon = data.longitude
            cityHtml.textContent = "Location based on IP: " +data.city
            console.log(lon)
            oneCall(lat,lon)
 
        })

    })
}

// Remove current image on search
var removeImage = function (){
    document.getElementById('icon').remove();
}
button.addEventListener('click',getData);
ipLocation()
