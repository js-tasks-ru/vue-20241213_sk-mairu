import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':')
  return +hours * 60 + +minutes
}

function isNight(dt, sunrise, sunset) {
  const dtMinutes = timeToMinutes(dt)
  return dtMinutes < timeToMinutes(sunrise) || dtMinutes > timeToMinutes(sunset)
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
  setup() {
    return {
      weatherData,
      WeatherConditionIcons,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="{ alert, current, geographic_name } in weatherData" class="weather-card" :class="{'weather-card--night': current.isNight }">
          <div v-if="alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ alert.sender_name }}: {{ alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="current.weather.description">{{ WeatherConditionIcons[current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ current.temp }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ current.pressure }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
