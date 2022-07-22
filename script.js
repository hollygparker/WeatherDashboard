var search = document.getElementById("search");
var searchBtn = document.querySelector("#searchBtn");

// boiler plate adding date function
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  var dateString = mm + "/" + dd + "/" + yyyy;

  return dateString;
};

// Getting weather based on click
function getWeather() {
  var apiKey = "c0ff6f5d40451857dcf907d773d1869d";
  var currentDateAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    search.value +
    "&appid=" +
    apiKey;
  // AJAX call to the api
  return (
    $.ajax({
      url: currentDateAPI,
      method: "GET",
      dataType: "json",
    })
      // Handing response given from api
      .then(function (response) {
        console.log(response);
        // setting lat and lon so we can use it in 5 day forecast call
        var lat = "" + response.coord.lat;
        var lon = "" + response.coord.lon;

        // getting current date using js DATE
        var currentDate = new Date();
        var dd = String(currentDate.getDate()).padStart(2, "0");
        var mm = String(currentDate.getMonth() + 1).padStart(2, "0");
        var yyyy = currentDate.getFullYear();
        currentDate = mm + "/" + dd + "/" + yyyy;

        // forecast api url
        var forecastAPI =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly&units=imperial&appid=" +
          apiKey;
        // making call to forecast api
        $.ajax({
          url: forecastAPI,
          method: "GET",
          dataType: "json",
        })
          // handling response from forecast api
          .then(function (response) {
            var currentWeather = response.current;
            var weatherDescription = currentWeather.weather[0].icon;
            var iconURL =
              "https://openweathermap.org/img/wn/" +
              weatherDescription +
              ".png";
            var htmlIconImg = "<img src='" + iconURL + "'>";
            $("#cityDate").html(
              search.value + " (" + currentDate + ") " + htmlIconImg
            );
            var temp = currentWeather.temp;
            $("#temp").text(temp + " °F");
            var humidity = currentWeather.humidity;
            $("#humidity").text(humidity + "%");
            var wind = currentWeather.wind_speed;
            $("#wind").text(wind + " mph");

            // handing uv index color changing by adding classes
            var uv = currentWeather.uvi;
            $("#uv").text(uv);
            $("#uv").css("color", "white");
            $("#uv").css("padding", "0.5em");

            // if uv index is less than or equal to 2 color should be green
            if (uv <= 2) {
              $("#uv").css("background-color", "green");
              $("#uv").css("color", "white");
            } else if (uv <= 8) {
              $("#uv").css("background-color", "lightyellow");
              $("#uv").css("color", "white");
            } else {
              $("#uv").css("background-color", "pink");
            }

            // setting forecast day arr to the daily response from api
            var forecastDayArr = response.daily;

            // looping over how many number of days there are in the html
            for (var i = 1; i < 6; i++) {
              var currentDay = forecastDayArr[i];

              // adding dates to make it increase
              var date = new Date();
              date = date.addDays(i);
              // appending it to the page
              $("#date" + i).text(date);

              // appending weather icon on date title
              var currentIcon = currentDay.weather[0].icon;
              var iconURL =
                "https://openweathermap.org/img/wn/" + currentIcon + ".png";
              $("#icon" + i).attr("src", iconURL);
              $("#date" + i).html("(" + date + ") " + htmlIconImg);
              // appending temp
              var temp = currentDay.temp.day;
              $("#temp" + i).text("Temperature: " + temp + " °F");
              // appending humidity
              var humidity = currentDay.humidity;
              $("#humidity" + i).text("Humidity: " + humidity + "%");
              // appending windspeed
              var wind = currentDay.wind_speed;
              $("#wind" + i).text("Wind Speed: " + wind + " mph");
            // handling uv index and color changes for forecast
              var uv = currentDay.uvi;
              $("#uv" + i).text(uv);
              $("#uv" + i).css("color", "white");
              $("#uv" + i).css("padding", "0.10em");

              // if uv index is less than or equal to 2 color should be green
              if (uv <= 2) {
                $("#uv" + i).css("background-color", "green");
                $("#uv" + i).css("color", "white");
              } else if (uv <= 8) {
                $("#uv" + i).css("background-color", "orange");
                $("#uv" + i).css("color", "white");
              } else {
                $("#uv" + i).css("background-color", "purple");
              }
            }
          });
      })
  );
}

searchBtn.addEventListener("click", getWeather);
