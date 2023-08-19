import React,{useState,useEffect} from 'react'
import Clocktick from './Clocktick';
import Datepicker from './Datepicker';
import apiKeys from "./apiKeys";
import axios from 'axios';
import ReactAnimatedWeather from "react-animated-weather";

function Maincontent() {

  const [localWeather, setLocalWeather] = useState({});
  const [weather, setWeather] = useState({}); 
  const [query,setQuery] = useState("");
  const [defaults, setDefaults] = useState({
    icon: undefined,
    color: "white",
    size: 112,
    animate: true,
  });

  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });
  
  useEffect(() =>{
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          let lat = position.coords.latitude, lon = position.coords.longitude;
          getWeather("Delhi");
          getLocalWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          //getLocalWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
  },[]);

  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };


  const getLocalWeather = async (lat, lon) => {
     await axios.get(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    ).then((response) => {
      setLocalWeather(response.data);
    }).catch((err) => {
      alert(err);
    });
  };

  const getWeather = async (city) => {
     await axios
     .get(
      `${apiKeys.base}weather?q=${
        city != "[object Object]" ? city : query
      }&units=metric&APPID=${apiKeys.key}`
    ).then((response) => {
      setWeather(response.data);
      console.log(response.data);
      alert(weather.weather[0].main);
      //setIcon();
    }).catch((err) => {
      alert(err);
    });
  };

  /*const setIcon = () => {
    switch (weather.weather[0].main) {
      case "Haze":
        this.setDefaults({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setDefaults({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setDefaults({ icon: "RAIN" });
        break;
      case "Snow":
        this.setDefaults({ icon: "SNOW" });
        break;
      case "Dust":
        this.setDefaults({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setDefaults({ icon: "SLEET" });
        break;
      case "Fog":
        this.setDefaults({ icon: "FOG" });
        break;
      case "Smoke":
        this.setDefaults({ icon: "FOG" });
        break;
      case "Tornado":
        this.setDefaults({ icon: "WIND" });
        break;
      default:
        this.setDefaults({ icon: "CLEAR_DAY" });
    }
  }*/



  


  return (
    <>
    <div className="square-box">
    <div className="left-content">
        <div>
            <h1 className="text-end xl">{localWeather.name}</h1>
            <h1 className="text-end xl">{localWeather.sys.country}</h1>
        </div>
        <div className="bottom-left">
            <div className="date-time-content text-start">
              <p className="xl"><Clocktick /></p>
              <p className="l"><Datepicker/></p>
            </div>
            <div className="temperature-content text-end">
              <p className="xxl">
               {Math.round(localWeather.main.temp)}°c
              </p>
            </div>
        </div>   
    </div>

    <div className="right-content text-center">
        <p className="icon-content"><ReactAnimatedWeather
                icon="RAIN"
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              /></p>
        <h1 className="xl">Haze</h1>
        <hr/>
        <div className="search-bar">
            <input type="text" placeholder="Search any city" onChange={(e) => setQuery(e.target.value)} value={query} />
            <p><span onClick={getWeather}  className="material-symbols-outlined">
              search
              </span></p>
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
    </div>
    </>
  )
}

export default Maincontent;
