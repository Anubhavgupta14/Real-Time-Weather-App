import React, { useEffect, useState } from "react";
import Left from "../../components/Left";
import Right from "../../components/Right";
import { getLatestData } from "./api/getDataApi";
const index = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const date = new Date(data?.date);
  const options = { day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-IN", options);
  const [weatherCondition, setWeatherCondition] = useState(data?.main ?? null)
  const [isNight, setIsNight] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const checkIsNight = () => {
    const currentTime = new Date();
    const currentHourIST = currentTime.getUTCHours() + 5 + (currentTime.getUTCMinutes() / 60); // IST time (UTC+5:30)
    
    if (currentHourIST >= 19 || currentHourIST < 4) {
      setIsNight(true); // 7 PM to 4 AM
    } else {
      setIsNight(false); // 4 AM to 7 PM
    }
  };

  useEffect(()=>{
    if(data?.main=="clear"){
        setWeatherCondition(0);
    }
    else if(data?.main=="Mist"){
        setWeatherCondition(1)
    }
    else if(data?.main=="Clouds"){
        setWeatherCondition(2)
    }
    else if(data?.main=="Haze"){
        setWeatherCondition(3)
    }
    else if(data?.main=="Drizzle" || data?.main=="Rain"){
        setWeatherCondition(4)
    }
    else if(data?.main=="Thunderstorm"){
        setWeatherCondition(5)
    }
    else if(data?.main=="Snow"){
        setWeatherCondition(6)
    }
    else if(data?.main=="Fog"){
        setWeatherCondition(7)
    }
    checkIsNight();
  },[data])

  const formatRealTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatRealTime());
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => clearInterval(timeInterval); // Cleanup on unmount
  }, []);

  const fetchLatestData = async () => {
    try {
      setIsLoading(true)
      const data = await getLatestData({ city: "Delhi" });
      setData(data.data)
    } catch (err) {
      console.log(err);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  if(isLoading) return "Loading..."
  return (
    <div className="parent">
      <div className={isNight ? "main img":"main"}>
        <Left data={data} formattedDate={formattedDate} weatherCondition={weatherCondition} currentTime={currentTime}/>
        <Right data={data}/>
      </div>
    </div>
  );
};

export default index;
