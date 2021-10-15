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
var cityUl = document.querySelector('.cityUl')

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
                var uvNumber = data.current.uvi

                if (uvNumber < 2) {
                    uvHtml.setAttribute("class", "text-success")
                } else if (uvNumber == 3,4,5){
                    uvHtml.setAttribute("class", "text-warning")
                } else if (uvNumber == 6,7){
                    uvHtml.setAttribute("class", "text-danger")
                }

                uvHtml.textContent = "UV Index: " + uvNumber
                var img = document.createElement('img');
                img.setAttribute("src", icon + data.current.weather[0].icon + "@4x.png")
                img.setAttribute("id", "icon")
                imgDiv.appendChild(img);
                fiveDay(data)

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

var getData = function (input) {
    console.log(input)
    var city = cityApi + input + key;

    fetch(city)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
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
            cityHtml.textContent = "IP Location: " +data.city

            oneCall(lat,lon)
            render();
        })
    })
}


var storedArr = []

var newSearch = function (){
    // Remove current image on search
    document.getElementById('icon').remove();
    var city = userInput.value
    storedArr.push(city)
    localStorage.setItem("user", JSON.stringify(storedArr));
    getData(city);
    render();
 }

 var storedCity = JSON.parse(localStorage.getItem("user"));

 var render = function (){

    cityUl.innerHTML=""
    console.log(storedCity)
    console.log(storedArr)
    for (var i = 0 ; i < storedArr.length; i++){
     
        var li = document.createElement('li')
        li.setAttribute("class","list-group-item bg-dark border-white")
        var a = document.createElement('a')
        var capCity = storedArr[i][0].toUpperCase()+storedArr[i].slice(1);
        var searchContainer = document.querySelector(".search-container")
        var searchDiv = document.getElementById("searchDiv")
        searchDiv.setAttribute("class", "card border-white mt-2")
        searchDiv.setAttribute("style", "height: auto")
        searchContainer.appendChild(searchDiv)
        a.textContent = capCity
        a.setAttribute("href","#")
        a.setAttribute("onclick","getData(value)")

        li.appendChild(a)
        cityUl.appendChild(li)
        cityHtml.textContent = capCity

    }
 }

var searchedCity = function (){
    var historyCity = document.querySelector(".searched")
    historyCity.addEventListener('click',searchedCity);
    console.log("clicked")
    var cityName = historyCity.value
    getData(cityName)
}


button.addEventListener('click',newSearch);

ipLocation()