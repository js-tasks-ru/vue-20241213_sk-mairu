import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'

import WeatherList from './WeatherList.js'

function isNight(dt, sunrise, sunset) {
  return dt < sunrise || dt > sunset
}

function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

function converthPatommHg(hPa) {
  return (hPa * 0.75).toFixed(0)
}

const weatherData = getWeatherData().map(item => {
  const { current } = item
  item.current.isNight = isNight(current.dt, current.sunrise, current.sunset)
  item.current.temp = convertKelvinToCelsius(current.temp)
  item.current.pressure = converthPatommHg(current.pressure)
  return item
})

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherList :weather="weatherData" />
    </div>
  `,
})
