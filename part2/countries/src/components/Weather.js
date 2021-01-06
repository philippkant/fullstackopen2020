import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState(null)

  const hook = () => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }
  useEffect(hook, [api_key, city])

  if (!weather) {
    return null
  }
  
  return (
    <div>
    <h3>Weather in {city}</h3>
    <div>temperature: {weather.current.temperature} {`feels like ${weather.current.feelslike}`}</div>
    <div>{weather.current.weather_descriptions[0]}</div>
    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} width="8%"></img>
    <div>wind: {`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}</div>
  </div>
  )
}

export default Weather