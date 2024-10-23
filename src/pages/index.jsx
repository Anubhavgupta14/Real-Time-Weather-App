import React, { useEffect, useState } from "react";
import Left from "../../components/Left";
import moment from "moment-timezone";
import Right from "../../components/Right";
import { getLatestData, fetchFreshData } from "./api/getDataApi";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
const index = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const date = moment().tz("Asia/Kolkata").startOf("day").toDate();
  const options = { day: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-IN", options);
  const [weatherCondition, setWeatherCondition] = useState(data?.main ?? null);
  const [isNight, setIsNight] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [isCel, setIsCel] = useState(true)
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];

  const checkIsNight = () => {
    const currentTime = new Date();
    const currentHourIST =
      currentTime.getUTCHours() + 5 + currentTime.getUTCMinutes() / 60; // IST time (UTC+5:30)

    if (currentHourIST >= 19 || currentHourIST < 4) {
      setIsNight(true); // 7 PM to 4 AM
    } else {
      setIsNight(false); // 4 AM to 7 PM
    }
  };

  useEffect(() => {
    if (data?.main == "clear") {
      setWeatherCondition(0);
    } else if (data?.main == "Mist") {
      setWeatherCondition(1);
    } else if (data?.main == "Clouds") {
      setWeatherCondition(2);
    } else if (data?.main == "Haze") {
      setWeatherCondition(3);
    } else if (data?.main == "Drizzle" || data?.main == "Rain") {
      setWeatherCondition(4);
    } else if (data?.main == "Thunderstorm") {
      setWeatherCondition(5);
    } else if (data?.main == "Snow") {
      setWeatherCondition(6);
    } else if (data?.main == "Fog") {
      setWeatherCondition(7);
    }
    checkIsNight();
  }, [data]);

  const formatRealTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
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
      setIsLoading(true);
      let data = await getLatestData({ city: cities[cityIndex] });

      setTimeout(() => {
        if (data?.alert) {
          toast.error("Warning temperature is above the threshold");
        }
      }, 1000);

      //if by chance no data is present in DB, so first generate data using fetch API and then fetch that data.
      if (!data || !data.data) {
        await fetchFreshData();
        data = await getLatestData({ city: cities[cityIndex] }); 
      }
      setData(data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 300000);
    return () => clearInterval(intervalId);
  }, [cityIndex]);

  if (isLoading)
    return (
      <div className="parent-loading">
        <div className="main-loading"></div>
        <p className="footer">
          Created by{" "}
          <Link
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href={"https://linkedin.com/in/anubhavgupta14"}
          >
            Anubhav Gupta
          </Link>
        </p>
      </div>
    );
  return (
    <>
      <Toaster />
      <div className="parent">
        <div className={isNight ? "main img" : "main"}>
          <Left
            data={data}
            formattedDate={formattedDate}
            weatherCondition={weatherCondition}
            currentTime={currentTime}
            cityIndex={cityIndex}
            setCityIndex={setCityIndex}
            citiesLenght={cities?.length ?? 0}
            isCel={isCel}
          />
          <Right data={data} isCel={isCel} setIsCel={setIsCel}/>
        </div>
        <p className="footer">
          Created by{" "}
          <Link
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href={"https://linkedin.com/in/anubhavgupta14"}
          >
            Anubhav Gupta
          </Link>
        </p>
      </div>
    </>
  );
};

export default index;
