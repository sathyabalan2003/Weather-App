"use script";
let lat;
let lon;
let locationName=document.getElementById("location")
let icon=document.getElementById("icon")
let descp=document.getElementById("description")
let temperature=document.getElementById("temperature")
let minTemp=document.getElementById("minTemp")
let maxTemp=document.getElementById("maxTemp")
let windspeed=document.getElementById("windspeed")
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position=>{
        lat=position.coords.latitude
        lon=position.coords.longitude
        let data=await(getWeatherData(lat,lon))
        console.log(data);
        var map = L.map('map').setView([lat, lon], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([lat, lon]).addTo(map);
marker.bindPopup(`<b>${data.name}</b><br>`).openPopup();
map.on('click',async function(e){
    const data=await getWeatherData(e.latlng.lat,e.latlng.lng)
    marker.setLatLng([e.latlng.lat,e.latlng.lng]);
    marker.bindPopup(`<b>${data.name}</b><br>`).openPopup();
    dataDhandler(data)
})
        dataDhandler(data)
    }
    )
}


async function getWeatherData(lat,lon){
    console.log(lat,lon);
    let apiKey="191e9e4b7a69eab99d34aece14d1f19f"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?&appid="+apiKey+"&units="+unit+"&lat="+lat+"&lon="+lon;
    let response= await fetch(url)
    let data = await response.json();
    return data;
}


function dataDhandler(data){
    // const {temp}=data.main
    const {description}=data.weather[0]
    const {temp_min,temp_max}=data.main
    console.log(data.wind);
    const {speed}=data.wind;
    locationName.innerHTML=data.name
    minTemp.innerHTML="Min Temp : "+temp_min  
    maxTemp.innerHTML="Max Temp : "+temp_max
    windspeed.innerHTML="Wind speed :"+speed
    descp.innerHTML="Description "+description
    console.log(description);
}