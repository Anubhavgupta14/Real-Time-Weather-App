import React from "react";
import dynamic from "next/dynamic";
import { CiDroplet } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Right = () => {
  const PaidChart = {
    series: [
      {
        name: "Paid",
        data: [25, 26, 25.4, 26.8, 24, 23.5, 23],
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
        categories: ["1am", "2am", "3am", "4am", "5am", "6am", "7am"],
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
      <div>
        <p className="welcome">Welcome back!</p>
        <p>Check out today's weather information</p>
      </div>
      <div className="history">
        <div className="temp-trends">
          <p>Temperature trends today</p>
          {typeof window !== "undefined" && (
            <Chart
              options={PaidChart.options}
              series={PaidChart.series}
              type="area"
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
      </div>

      <p className="welcome" style={{ marginTop: "20px" }}>
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
          <h2>87%</h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Feels Like</p>
            <div className="card-icon">
              <TbTemperatureCelsius />
            </div>
          </div>
          <h2 className="temp-card">25<span className="cel2">o</span></h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Wind Speed</p>
            <div className="card-icon">
              <FaWind />
            </div>
          </div>
          <h2>3 mi/h</h2>
        </div>
        <div className="cards">
          <div className="top-card">
            <p>Dominant Condition</p>
            <div className="card-icon">
              <TiWeatherCloudy />
            </div>
          </div>
          <h2>Haze</h2>
        </div>
      </div>
    </div>
  );
};

export default Right;
