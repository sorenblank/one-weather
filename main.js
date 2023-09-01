import token from "./config.js";

let defaultCity = "New York"
const city = document.querySelector(".search input");
const button = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// function successCallback(position) {
//     console.log(position);
// }
  
// const errorCallback = (error) => {
//     console.log(error);
//   };

  
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


async function funcApi(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`;
    const response = await fetch(apiUrl);
    var data = await response.json()
    return data;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time =  hour + ':' + min ;
    return time;
  }




async function weather(location,api){
    let data = await api(location);

    console.log(data);
    

    document.querySelector(".city").innerHTML = `${data.name}`;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(".feels").innerHTML = `${data.main.feels_like}°C`;
    document.querySelector(".pressure").innerHTML = `${(data.main.pressure/1015.22).toFixed(2)}atm`;

    document.querySelector(".sunrise").innerHTML = `${timeConverter(data.sys.sunrise)}`;
    document.querySelector(".sunset").innerHTML = `${timeConverter(data.sys.sunset)}`;

    document.querySelector(".maxtemp").innerHTML = `${Math.round(data.main.temp_max)}°C`;
    document.querySelector(".mintemp").innerHTML = `${Math.round(data.main.temp_min)}°C`;

    let weatherData = data.weather[0].main

    if( weatherData == "Clouds"){
        weatherIcon.src = "images/clouds.png"; 
    } 
    else if (weatherData == "Clear") {
        weatherIcon.src = "images/clear.png"; 
    }
    else if (weatherData == "Rain") {
        weatherIcon.src = "images/rain.png"; 
    }
    else if (weatherData == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"; 
    }
    else if (weatherData == "Snow") {
        weatherIcon.src = "images/snow.png"; 
    }
    else if (weatherData == "Mist") {
        weatherIcon.src = "images/mist.png"; 
    }

    console.log(timeConverter(data.sys.sunrise));
    console.log(timeConverter(data.sys.timezone));
}

button.addEventListener("click", ()=> {
    weather(city.value,funcApi);
    console.log(city.value)
})

weather(defaultCity,funcApi);


document.getElementById('myform').addEventListener('submit', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Trigger a click on the button when Enter is pressed
    document.querySelector('button[type="submit"]').click();
});