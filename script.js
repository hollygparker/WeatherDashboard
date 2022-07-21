// * var geocode =  'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=c0ff6f5d40451857dcf907d773d1869d'
// todo input the lat/lon returned from geocode into requestUrl
// * var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=c0ff6f5d40451857dcf907d773d1869d'

// var container = document.getElementById('container')
// var cities = document.getElementById('cities')
// var searchForm = document.getElementById('searchForm')
var search = document.getElementById('search')
var searchBtn = document.querySelector('#searchBtn')
// var preset = document.getElementById('preset')
// var city0 = document.getElementById('city0')
// var city1 = document.getElementById('city1')
// var city2 = document.getElementById('city2')
// var city3 = document.getElementById('city3')
// var city4 = document.getElementById('city4')
// var city5 = document.getElementById('city5')
// var city6 = document.getElementById('city6')
// var city7 = document.getElementById('city7')
// var forecast = document.getElementById('forecast')
// var today = document.getElementById('today')
// var cityDate = document.getElementById('cityDate')
// var temp = document.getElementById('temp')
// var wind = document.getElementById('wind')
// var humidity = document.getElementById('humidity')
// var uv = document.getElementById('uv')
// var fiveDay = document.getElementById('fiveDay')
// var day0 = document.getElementById('day0')
// var date0 = document.getElementById('date')
// var temp0 = document.getElementById('temp0')
// var wind0 = document.getElementById('wind0')
// var humidity0 = document.getElementById('humidity0')
// var day1 = document.getElementById('day1')
// var date1 = document.getElementById('date1')
// var temp1 = document.getElementById('temp1')
// var wind1 = document.getElementById('wind1')
// var humidity1 = document.getElementById('humidity1')
// var day2 = document.getElementById('day2')
// var date2 = document.getElementById('date2')
// var temp2 = document.getElementById('temp2')
// var wind2 = document.getElementById('wind2')
// var humidity2 = document.getElementById('humidity2')
// var day3 = document.getElementById('day3')
// var date3 = document.getElementById('date3')
// var temp3 = document.getElementById('temp3')
// var wind3 = document.getElementById('wind3')
// var humidity3 = document.getElementById('humidity3')
// var day4 = document.getElementById('day4')
// var date4 = document.getElementById('date4')
// var temp4 = document.getElementById('temp4')
// var wind4 = document.getElementById('wind4')
// var humidity4 = document.getElementById('humidity4')
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var dateString = mm + '/' + dd + '/' + yyyy;

    return dateString;
}

function getWeather() {
    // Insert the API url to get a list of your repos
    // var geocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + search.value + "&limit=1&appid=c0ff6f5d40451857dcf907d773d1869d"
    // * var latLon = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat.value + "&lon=" + lon.value "&exclude={part}&appid=" + apiKey

    var apiKey = "c0ff6f5d40451857dcf907d773d1869d"
    var todayAPI = "https://api.openweathermap.org/data/2.5/weather?q="+search.value+"&appid="+apiKey;
    
        return $.ajax({
            url: todayAPI,
            method: "GET",
            dataType: "json",
        })
    
        .then(function (response) {
            console.log(response)
            var lat = "" + response.coord.lat;
            var lon = "" + response.coord.lon;
            console.log(lat)
            // var cityName = response.name;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
    
            today = mm + '/' + dd + '/' + yyyy;
    


            // var geocode =  "http://api.openweathermap.org/geo/1.0/direct?q="+search.value+"&limit={limit}&appid="+apiKey;

            var fiveDayAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&units=imperial&appid="+apiKey;
            
            console.log(fiveDayAPI)
            $.ajax({
                url: fiveDayAPI,
                method: "GET",
                dataType: "json",
            })
    
            .then(function (response) {
                var currentWeather = response.current;
                var weatherDescription = currentWeather.weather[0].icon;
                var iconURL = "https://openweathermap.org/img/wn/" + weatherDescription + ".png";
                var currentConditions = "<img src='"+iconURL+"'>"
                $("#cityDate").html((search.value)+ " ("+today+") "+currentConditions);
                var temp = currentWeather.temp;
                $("#temp").text(temp+" °F");
                var humidity = currentWeather.humidity;
                $("#humidity").text(humidity+"%");
                var wind = currentWeather.wind_speed;
                $("#wind").text(wind+" mph");
                var uv = currentWeather.uvi;
                $("#uv").addClass("button");
                $("#uv").text(uv);
                $("#uv").css("color","white");

                if (uv <= 2){
                    $("#uv").css("background-color","lightgreen");
                }
                else if (uv <= 8){
                    $("#uv").css("background-color","rgba(202, 202, 29, 0.701)");
                }
                else{
                    $("#uv").css("background-color","pink");
                }
    
                
                var dailyWeatherArray = response.daily; 
                for (var i = 1;i < 6;i++){
                    var currentDay = dailyWeatherArray[i]
                    
                    var date = new Date();
                    date = date.addDays(i);
                    
                    $(".date-"+i).text(date);
                   
                    var currentIcon = currentDay.weather[0].icon;
                    var iconURL = "https://openweathermap.org/img/wn/" + currentIcon + ".png";
                    $(".icon-"+i).attr("src",iconURL);
                    
                    var temp = currentDay.temp.day;
                    $(".temp-"+i).text("Temp: "+temp+" °F");
    
                    var humidity = currentDay.humidity;
                    $(".humidity-"+i).text("Humidity: "+humidity+"%");
                }
            })
        })
    }
    // var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + search.value +  "&appid=" + apiKey;
    
    // return $.ajax({
    //     url:currentWeather,
    //     method:"GET",
    //     dataType:"json"
    // })
    // .then(function(response){
    //     console.log(response)
    //     console.log('hi!')
    // })


    // fetch(currentWeather)
    //   .then(function (response) {
    //       console.log(response)
    //       console.log('hi!')
    //       console.log(search.value)
    //   })
    

    //   .then(function (response) {
    //     //looping over the fetch response and inserting the URL of your repos into a list
    //     console.log(response)
    //     console.log(response.data.length)
    //     for (var i = 0; i < response.data.length; i++) {
    //         console.log(response[i].name)
    //       Create a list element
    //       var gif = document.createElement('img')

  
    //       //Set the text of the list element to the JSON response's .html_url property
    //       gif.src = response.data[i].images.downsized.url

    //       var gifTitle = document.createElement('h3')
    //       gifTitle.textContent = response.data[i].title
    //       console.log(gifTitle)
          
          
  
    //       //Append the li element to the id associated with the ul element.
    //       favorites.appendChild(gif)
    //     //   console.log('.favorites')

    //       favorites.appendChild(gifTitle)
    //     }
    //   })
//   }

  searchBtn.addEventListener('click', getWeather)