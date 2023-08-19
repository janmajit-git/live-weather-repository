import React,{useState,useEffect} from 'react'
import Clocktick from './Clocktick';
import Datepicker from './Datepicker';
import apiKeys from "./apiKeys";
import axios from 'axios';
import Forecast from './Forecast';
import loader from "./images/WeatherIcons.gif";

function Maincontent() {

  const [localWeather, setLocalWeather] = useState({});
   

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
      console.log(err);
    });
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          getLocalWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          getLocalWeather(23.8502746, 91.272254);
          console.log(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      console.log("Geolocation not available");
    }
    return ()=>{
      clearInterval(interval);
    }
  },[]);

  const interval = setInterval(getLocalWeather, 600000);

  
  if(localWeather.name !== undefined){
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
              <p className="l"><Datepicker /></p>
            </div>
            <div className="temperature-content text-end">
              <p className="xxl">
               {Math.round(localWeather.main.temp)}°c
              </p>
            </div>
        </div>   
    </div>
    <Forecast />
    </div>
    </>
  )
  }
  else{
    return(<>
      <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
      <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
        Detecting your location
      </h3>
      <h3 style={{ color: "white", marginTop: "10px" }}>
        Your current location wil be displayed on the App <br></br> & used
        for calculating Real time weather.
      </h3>
    </>)
  }
}

export default Maincontent;
