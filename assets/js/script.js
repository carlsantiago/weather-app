var userInput = document.querySelector('#inputCity')
var button = document.querySelector('.search-btn')
var key = "55812aacf39e5980618e27ed1e71ce38"
;

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+userInput.value+'&appid='+key+'')
    .then(response => response.json())
    .then(data => console.log(data))

})