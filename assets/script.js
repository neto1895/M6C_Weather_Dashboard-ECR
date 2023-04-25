var APIkey = '002b080f4f5ff3c71c662811a4753e10';

var SearchCityInput = document.getElementById('cityForm');

var city = "Mexico City";
var latitude;
var longitude;
var date_array = [];
var icon_array = [];
var description_array = [];
var temp_array = [];
var wind_array = [];
var humidity_array = []; 


function SearchCity(event) {
    event.preventDefault();
    city = document.getElementById('CityInput').value;

    if (!city) {
        window.alert('Please select a city');
        return
    }
    geoCODE_call();
}


function geoCODE_call(queryURL){
// geoCODING according to documentation to obtain the lat & lon coordinates.
    var queryURL ="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+APIkey;

    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log('GeoCODING response:')
            console.log(data);
            city = data[0].name;
            latitude = data[0].lat;
            console.log(latitude);
            longitude = data[0].lon;
            console.log(longitude);
        })
        .then(secondAPIcal)
        .then(fiveDaysForecast)
    }

function secondAPIcal(){
    var QueryURL_current = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude + "&appid=" + APIkey + "&units=metric";
        console.log(QueryURL_current);
    fetch(QueryURL_current)
        .then(function(secondResponse) {
            console.log(secondResponse);
            return  secondResponse.json();
        })
        .then(function(data2){
                document.querySelector(".current_city_name").textContent = city;
                document.querySelector(".date_"+0).textContent = new Date();
                document.querySelector(".icon_"+0).src = "https://openweathermap.org/img/wn/"+data2.weather[0].icon+"@2x.png";
                document.querySelector(".weather_description_"+0).textContent = data2.weather[0].description;
                document.querySelector(".Temperature_"+0).textContent = data2.main.temp;
                document.querySelector(".Wind_"+0).textContent = data2.wind.speed;
                document.querySelector(".Humidity_"+0).textContent = data2.main.humidity;

        })
}

function fiveDaysForecast(){
    var QueryURL_5 = "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude + "&appid=" + APIkey + "&units=metric";

        console.log(QueryURL_5);
    fetch(QueryURL_5)
        .then(function(secondResponse) {
            return  secondResponse.json();
        })
        .then(function(data3){

            for (var i = 3; i < data3.list.length; i ++){
                document.querySelector(".current_city_name").textContent = city;
                document.querySelector(".date_"+i).textContent = data3.list[i].dt_txt;
                document.querySelector(".icon_"+i).src = "https://openweathermap.org/img/wn/"+data3.list[i].weather[0].icon+"@2x.png";
                document.querySelector(".weather_description_"+i).textContent = data3.list[i].weather[0].description;
                document.querySelector(".Temperature_"+i).textContent = data3.list[i].main.temp;
                document.querySelector(".Wind_"+i).textContent = data3.list[i].wind.speed;
                document.querySelector(".Humidity_"+i).textContent = data3.list[i].main.humidity;
                i = i+7;
            }
        })
}

function update_weather(){

}

function createBtn(){
    var cityBtn = document.createElement("button");
    cityBtn.classList.add("btn", "btn-outline-secondary", "btn-lg");
    cityBtn.setAttribute("id",city);
    cityBtn.setAttribute("onClick","search_city_list(this.id)");
    cityBtn.innerText = city;
    document.querySelector(".city_container").appendChild(cityBtn);
}

function search_city_list(city_clicked){
    city = city_clicked;

    Main_call();
}


function search_city(){
    city = document.getElementById("CityInput").value
    createBtn();
    Main_call();
}

document.querySelector(".submit_city").addEventListener("click",search_city);

function Main_call(){
    geoCODE_call();
    update_weather();
}