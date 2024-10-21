import React from "react";
import dynamic from "next/dynamic";
import { CiDroplet } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Right = ({ data }) => {
  const temperatures = data?.temp_list?.map((entry) => entry.temp);
  const timeLabels = data?.temp_list?.map((entry) => {
    const hour = parseInt(entry.time, 10);
    return hour === 0 ? "12am" : hour > 12 ? `${hour - 12}pm` : `${hour}am`;
  });

  const WeatherChart = {
    series: [
      {
        name: "Temperature",
        data: temperatures, // Use temperatures array
      },
    ],
    options: {
      chart: {
        type: "area",
        width: "100%",
        height: "100%",
        toolbar: {
          show: false,
        },
      },
      colors: ["#5c9ce4"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0,
          opacityFrom: 0.7,
          opacityTo: 0.5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        show: true,
        categories: timeLabels, // Use timeLabels array
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: true,
      },
      grid: {
        show: false,
      },
    },
  };
  return (
    <div className="right">
      <div className="right-head">
        <p className="welcome">Welcome back!</p>
        <p>Check out today's weather information</p>
      </div>
      <div className="history">
        <div className="temp-trends">
          <p>Temperature trends today</p>
          {typeof window !== "undefined" && (
            <Chart
              options={WeatherChart.options}
              series={WeatherChart.series}
              type="area"
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
      </div>

      <p className="moreDetail" style={{ marginTop: "20px" }}>
        More details of today's weather
      </p>
      <div className="others">
        <div className="cards">
          <div className="top-card">
            <p>Humidity</p>
            <div className="card-icon">
              <CiDroplet />
            </div>
          </div>
          <h2>{data?.humidity ?? ""}%</h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Feels Like</p>
            <div className="card-icon">
              <TbTemperatureCelsius />
            </div>
          </div>
          <h2 className="temp-card">
            {data?.feels_like ?? ""}
            <span className="cel2">o</span>
          </h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Wind Speed</p>
            <div className="card-icon">
              <FaWind />
            </div>
          </div>
          <h2>{data?.wind_speed ?? ""} mi/h</h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Dominant Condition</p>
            <div className="card-icon">
              <TiWeatherCloudy />
            </div>
          </div>
          <h2>{data?.dominantCondition ?? ""}</h2>
        </div>
      </div>
    </div>
  );
};

export default Right;
