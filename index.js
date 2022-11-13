async function getWeather(city) {
    
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=88dd3eb53994cc7bcb7b245e0018da8a&units=metric`)
        data = await data.json()
        appendData(data)

        document.querySelector("#gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
    }

    catch {
        console.log("City not found")
    }
}

async function appendData(data) {
    let cityName = data.name
    let temp = Math.round(data.main.temp)
    let country = data.sys.country
    let min_temp = Math.round(data.main.temp_min)
    let max_temp = Math.round(data.main.temp_max)
    let feelsLike = Math.round(data.main.feels_like)
    let windSpeed = data.wind.speed
    let windDeg = data.wind.deg + 90
    let lat = data.coord.lat
    let lon = data.coord.lon
    let aqi = await getAqi(lat, lon)
    let sky = data.weather[0].main
    let humid = data.main.humidity
    let view = data.visibility/1000

    console.log(data)

    document.querySelector("#cityName").innerText = `${cityName}, ${country}`
    document.querySelector("#weather").innerText = `${temp}°C`
    document.querySelector(".temp_min").innerText = `↓ ${min_temp}°C`
    document.querySelector(".temp_max").innerText = `↑ ${max_temp}°C`
    document.querySelector(".feelsLike").innerText = `Feels like ${feelsLike}°C`
    document.querySelector(".windSpeed").innerText = `Wind ${windSpeed}m/s`
    document.querySelector(".windDir").style.transform = `rotate(${windDeg}deg)`
    document.querySelector("#aqiIndex").innerText = `${aqi}`
    document.querySelector("#type").innerText = `${sky}`
    document.querySelector("#humidText").innerText = `Humidity: ${humid}`
    document.querySelector("#viewText").innerText = `Visibility: ${view}km`

    let aqiName = document.querySelector(".aqiName")

    if (aqi == 1) {
        aqiName.innerText = "Good"
        aqiName.style.backgroundColor = "yellowgreen"
    }
    else if (aqi == 2) {
        aqiName.innerText = "Fair"
        aqiName.style.backgroundColor = "green"
    }
    else if (aqi == 3) {
        aqiName.innerText = "Moderate"
        aqiName.style.backgroundColor = "#F6BE00"
    }
    else if (aqi == 4) {
        aqiName.innerText = "Poor"
        aqiName.style.backgroundColor = "orange"
    }
    else if (aqi == 5) {
        aqiName.innerText = "Very Poor"
        aqiName.style.backgroundColor = "red"
    }

    let icon = document.querySelector("#icon")

    icon.style.width = "30px"


    if (data.weather[0].main == "Mist") {
        icon.setAttribute("src", "https://cdn-icons-gif.flaticon.com/6454/6454995.gif")
    }
    else if (data.weather[0].main == "Clear") {
        icon.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/7780/7780231.png")
        icon.style.width = "40px"
    }
    else if (data.weather[0].main == "Clouds") {
        icon.setAttribute("src", "https://cdn-icons-gif.flaticon.com/6455/6455024.gif")
    }
    else if (data.weather[0].main == "Rain") {
        icon.setAttribute("src", "https://cdn-icons-gif.flaticon.com/6455/6455054.gif")
    }
}

function input() {
    let cityName = document.querySelector("#city").value

    cityName = cityName.split(" ").join("+")

    getWeather(cityName)
}

async function getAqi(lat, lon) {

    try {
        let aqi = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=88dd3eb53994cc7bcb7b245e0018da8a`)
        aqi = await aqi.json()
        aqi = aqi.list[0].main.aqi
        return aqi
    }
    catch {
        
    }
}

async function getCurrentWeather(lat, lon) {
    
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88dd3eb53994cc7bcb7b245e0018da8a&units=metric`)
        data = await data.json()
        appendData(data)

        document.querySelector("#gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${lat},${lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
    }

    catch {
        console.log("City not found")
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  getCurrentWeather(lat, lon)
}

window.onload = getLocation()