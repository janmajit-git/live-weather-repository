import React,{useState,useEffect} from 'react'
import apiKeys from "./apiKeys";
import axios from 'axios';
import ReactAnimatedWeather from "react-animated-weather";

function Forecast() {

  const [weatherReport, setWeatherReport] = useState({}); 
  const [place, setPlace] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("SNOW");
    
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };


  const getWeather = async (city) => {
    await axios
    .get(
     `${apiKeys.base}weather?q=${
        city != "[object Object]" ? city : place
     }&units=metric&APPID=${apiKeys.key}`
   ).then((response) => {
     setWeatherReport(response.data);
     setIconName(response.data.weather[0].main);
   }).catch((err) => {
     console.log(err);
   });
  };

  const setIconName = (iconName) => {
    switch (iconName) {
      case "Haze":
        setWeatherIcon("CLEAR_DAY");
        break;
      case "Clouds":
        setWeatherIcon("CLOUDY");
        break;
      case "Rain":
        setWeatherIcon("RAIN");
        break;
      case "Snow":
        setWeatherIcon("SNOW");
        break;
      case "Dust":
        setWeatherIcon("WIND");
        break;
      case "Drizzle":
        setWeatherIcon("SLEET");
        break;
      case "Fog":
        setWeatherIcon("FOG");
        break;
      case "Smoke":
        setWeatherIcon("FOG");
        break;
      case "Tornado":
        setWeatherIcon("WIND");
        break;
      default:
        setWeatherIcon("CLEAR_DAY");
    }
  };

  useEffect(()=>{
    getWeather("Delhi");
    return ()=>{};
  },[]);


  if(weatherReport.name !== undefined){
  return(
    <div className="right-content text-center">
        <p className="icon-content">
          <ReactAnimatedWeather
          icon={weatherIcon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        /></p>
        <h1 className="xl">{weatherReport.weather[0].main}</h1>
        <hr/>
        <div className="search-bar">
            <input type="text" placeholder="Search any city" onChange={(e) => setPlace(e.target.value)} value={place} />
            <p><span onClick={getWeather} className="material-symbols-outlined">
              search
              </span>
              </p>
        </div>

        <div>
        <p className="right-city-content text-center">{weatherReport.name}, {weatherReport.sys.country}</p>
            <hr/>
            <p className="common-text text-start">Temperature&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(weatherReport.main.temp)}°c ({weatherReport.weather[0].main})</p>
            <hr/>
            <p className="common-text text-start">Humidity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(weatherReport.main.humidity)}%</p>
            <hr/>
            <p className="common-text text-start">Visibility&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(weatherReport.visibility)} mi</p>
            <hr/>
            <p className="common-text text-start">Wind Speed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Math.round(weatherReport.wind.speed)} km/h</p>
            </div>
        </div>


  )
  }
  else{
    return(<h1>Loading</h1>)
  }



}

export default Forecast;