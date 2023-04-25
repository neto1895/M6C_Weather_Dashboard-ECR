// Define the OpenWeatherMap API key and default city
var APIkey = '002b080f4f5ff3c71c662811a4753e10';
var city = "Mexico City";
var latitude;
var longitude;
// Function to retrieve the latitude and longitude of a city using the OpenWeatherMap Geocoding API
function geoCODE_call(queryURL){
        // Construct the API query URL with the specified city and API key
    var queryURL ="https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+APIkey;
    fetch(queryURL)     // Fetch the data from the API using the query URL
        .then(function (response) {
            return response.json();
        })
        .then(function(data) { // Extract the latitude and longitude from the API response data
            city = data[0].name;
            latitude = data[0].lat;
            longitude = data[0].lon;
        })        // Call the functions to retrieve and display the current weather data and 5-day forecast
        .then(secondAPIcal)
        .then(fiveDaysForecast)
    }
    function secondAPIcal(){ // Function to retrieve and display the current weather data
        var QueryURL_current = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude + "&appid=" + APIkey + "&units=metric";
        fetch(QueryURL_current)
            .then(function(secondResponse) {
                return  secondResponse.json();
            })
            .then(function(data2){         // Display the retrieved weather data on the dashboard
                    document.querySelector(".city_pic").src = "https://source.unsplash.com/random/1600x900/?city%20"+city;
                    document.querySelector(".current_city_name").textContent = city;
                    document.querySelector(".date_"+0).textContent = new Date();
                    document.querySelector(".icon_0").src = "https://openweathermap.org/img/wn/"+data2.weather[0].icon+"@2x.png";
                    document.querySelector(".weather_description_"+0).textContent = data2.weather[0].description;
                    document.querySelector(".Temperature_"+0).textContent = "Temp: " +data2.main.temp+"  °C";
                    document.querySelector(".Wind_"+0).textContent = "Wind: "+data2.wind.speed+"  m/sec";
                    document.querySelector(".Humidity_"+0).textContent = "Humidity: "+data2.main.humidity+"  %";
            })
    }// Function to retrieve and display the 5-day forecast
    function fiveDaysForecast(){
        var QueryURL_5 = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude + "&appid=" + APIkey + "&units=metric";
        fetch(QueryURL_5)
            .then(function(secondResponse) {
                return  secondResponse.json();
            })
            .then(function(data3){        // Display the retrieved weather data on the dashboard
                for (var i = 3; i < data3.list.length; i ++){
                    document.querySelector(".current_city_name").textContent = city;
                    document.querySelector(".date_"+i).textContent = data3.list[i].dt_txt;
                    document.querySelector(".icon_"+i).src = "https://openweathermap.org/img/wn/"+data3.list[i].weather[0].icon+"@2x.png";
                    document.querySelector(".weather_description_"+i).textContent = data3.list[i].weather[0].description;
                    document.querySelector(".Temperature_"+i).textContent = "Temp: " +data3.list[i].main.temp+"  °C";
                    document.querySelector(".Wind_"+i).textContent = "Wind: "+data3.list[i].wind.speed+"  m/sec";
                    document.querySelector(".Humidity_"+i).textContent = "Humidity: "+data3.list[i].main.humidity+"  %";
                    i = i+7;
                }
            })
    }
//Create buttons for every searched city
function createBtn(){
    var cityBtn = document.createElement("button");
    cityBtn.classList.add("btn", "btn-outline-secondary", "btn-lg");
    cityBtn.setAttribute("id",city);
    cityBtn.setAttribute("onClick","search_city_list(this.id)");
    cityBtn.innerText = city;
    document.querySelector(".city_container").appendChild(cityBtn);
}
// fetch previous searched city by the generated button
function search_city_list(city_clicked){
    city = city_clicked;
    geoCODE_call();
}
//search the city using the input value
function search_city(){
    city = document.getElementById("CityInput").value
    if (!city) {
        window.alert('Please select a city');
        return
    }
    createBtn();
    geoCODE_call();
}
// This function is called when the page loads
function init(){
    createBtn();
    geoCODE_call();
}
init();
document.querySelector(".submit_city").addEventListener("click",search_city);