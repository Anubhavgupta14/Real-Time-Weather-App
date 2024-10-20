import React from 'react'
import { CiLocationArrow1 } from "react-icons/ci";
import { TiWeatherSunny,TiWeatherDownpour, TiWeatherCloudy,TiWeatherNight, TiWeatherSnow,TiWeatherStormy,TiWeatherWindyCloudy } from "react-icons/ti"; //sunny, rain

const index = () => {
  return (
    <div className='parent'>
      <div className='main'>
        <div className='left'>
          <div className='location'>
            <div className='location-icons'>
              <CiLocationArrow1/>
              <p>Delhi, India</p>
            </div>
          </div>
          <div className='dates'>
            <p>Today 28 Sept</p>
          </div>
          <div className='temp'>
            <h2 className='main-temp'>27<span className='cel'>{" "}o</span></h2>
          </div>
          <div className='conditions'>
            <TiWeatherSunny/>
            <p>Sunny</p>
          </div>
        </div>
        <div className='right'>
        
        </div>
      </div>
    </div>
  )
}

export default index