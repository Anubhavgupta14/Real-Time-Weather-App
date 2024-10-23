import React, { useEffect, useState } from "react";
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
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
const Left = ({
  data,
  formattedDate,
  weatherCondition,
  currentTime,
  cityIndex,
  setCityIndex,
  citiesLenght,
  isCel,
}) => {
  const condition = {
    0: {
      comp: <Image src={"/clear.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherSunny />,
    },
    1: {
      comp: <Image src={"/Mist.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherWindyCloudy />,
    },
    2: {
      comp: <Image src={"/Cloudy.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherCloudy />,
    },
    3: {
      comp: <Image src={"/haze.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherSunny />,
    },
    4: {
      comp: <Image src={"/rain.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherDownpour />,
    },
    5: {
      comp: (
        <Image src={"/thunderstorm.png"} alt="cover" height={80} width={80} />
      ),
      svg: <TiWeatherStormy />,
    },
    6: {
      comp: <Image src={"/snow.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherSnow />,
    },
    7: {
      comp: <Image src={"/fog.png"} alt="cover" height={80} width={80} />,
      svg: <TiWeatherSunny />,
    },
  };

  const handleChangeCity = (dir) => {
    if (dir) {
      //forward
      setCityIndex((prev) => (prev + 1) % citiesLenght);
    } else {
      if (cityIndex == 0) {
        setCityIndex(citiesLenght - 1);
      } else {
        setCityIndex((prev) => prev - 1);
      }
    }
  };
  //   console.log(formattedDate);
  return (
    <div className="left">
      <div className="location">
        <div className="location-icons">
          <CiLocationArrow1 />
          <p>{data?.city ?? ""}, India</p>
        </div>
        <p>{currentTime}</p>
      </div>
      <div className="dates">
        <p>Today {formattedDate}</p>
      </div>
      <div>
        <div className="image-condition">
          {condition[weatherCondition]?.comp}
        </div>
      </div>
      <div className="temp">
        <MdArrowBackIos
          className="arrows"
          onClick={() => {
            handleChangeCity(0);
          }}
        />
        {isCel ? (
          <h2 className="main-temp">
            {data?.temp ?? null}
            <span className="cel"> o</span>
          </h2>
        ) : (
          <h2 className="main-temp">
            {parseInt(data?.temp) + 273.15 ?? null}K
          </h2>
        )}
        <MdArrowForwardIos
          className="arrows"
          onClick={() => {
            handleChangeCity(1);
          }}
        />
      </div>
      <div className="conditions">
        {condition[weatherCondition]?.svg}
        <p>{data?.main ?? ""}</p>
      </div>
      <div className="avgTempdiv">
        <div className="avgCard">
          {isCel ? (
            <p style={{ position: "relative" }}>
              {(data?.avgTemp ?? null)?.toFixed(2)}
              <span className="cel3">o</span>
            </p>
          ) : (
            <p style={{ position: "relative" }}>
              {(parseInt(data?.avgTemp) + 273.15 ?? null)?.toFixed(2)}K
            </p>
          )}
          <p>Average</p>
        </div>
        <div className="avgCard">
          {isCel ? (
            <p style={{ position: "relative" }}>
              {(data?.maxTemp ?? null)?.toFixed(2)}
              <span className="cel3">o</span>
            </p>
          ) : (
            <p style={{ position: "relative" }}>
              {(parseInt(data?.maxTemp) + 273.15 ?? null)?.toFixed(2)}K
            </p>
          )}
          <p>Maximum</p>
        </div>
        <div className="avgCard">
          {isCel ? (
            <p style={{ position: "relative" }}>
              {(data?.minTemp ?? null)?.toFixed(2)}
              <span className="cel3">o</span>
            </p>
          ) : (
            <p style={{ position: "relative" }}>
              {(parseInt(data?.minTemp) + 273.15 ?? null)?.toFixed(2)}K
            </p>
          )}
          <p>Minimum</p>
        </div>
      </div>
    </div>
  );
};

export default Left;
