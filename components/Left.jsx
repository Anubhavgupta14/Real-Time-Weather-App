import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import {
  TiWeatherSunny,
  TiWeatherDownpour,
  TiWeatherCloudy,
  TiWeatherNight,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherWindyCloudy,
} from "react-icons/ti"; //sunny, rain
import Image from "next/image";

const Left = () => {
  return (
    <div className="left">
      <div className="location">
        <div className="location-icons">
          <CiLocationArrow1 />
          <p>Delhi, India</p>
        </div>
      </div>
      <div className="dates">
        <p>Today 28 Sept</p>
      </div>
      <div>
        <div className="image-condition">
          <Image src={"/clear.png"} alt="cover" height={80} width={80} />
        </div>
      </div>
      <div className="temp">
        <h2 className="main-temp">
          27<span className="cel"> o</span>
        </h2>
      </div>
      <div className="conditions">
        <TiWeatherSunny />
        <p>Sunny</p>
      </div>
      <div className="avgTempdiv">
        <div className="avgCard">
          <p style={{ position: "relative" }}>
            25<span className="cel3">o</span>
          </p>
          <p>Average</p>
        </div>
        <div className="avgCard">
          <p style={{ position: "relative" }}>
            36<span className="cel3">o</span>
          </p>
          <p>Maximum</p>
        </div>
        <div className="avgCard">
          <p style={{ position: "relative" }}>
            20<span className="cel3">o</span>
          </p>
          <p>Minimum</p>
        </div>
      </div>
    </div>
  );
};

export default Left;
