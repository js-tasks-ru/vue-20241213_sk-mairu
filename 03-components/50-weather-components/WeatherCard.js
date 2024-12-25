import { defineComponent, toRefs } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherAlert from './WeatherAlert.js'
import WeatherDetailsItem from './WeatherDetailsItem.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherDetailsItem,
  },

  props: {
    weatherItem: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { alert, current, geographic_name } = toRefs(props.weatherItem)

    return {
      WeatherConditionIcons,
      alert,
      current,
      geographic_name,
    }
  },

  template: `
    <li class="weather-card" :class="{'weather-card--night': current.isNight }">
      <WeatherAlert v-if="alert">
        {{ alert.sender_name }}: {{ alert.description }}
      </WeatherAlert>
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
        <WeatherDetailsItem title="Давление, мм рт. ст." :value="current.pressure" />
        <WeatherDetailsItem title="Влажность, %" :value="current.humidity" />
        <WeatherDetailsItem title="Облачность, %" :value="current.clouds" />
        <WeatherDetailsItem title="Ветер, м/с" :value="current.wind_speed" />
      </div>
    </li>
  `,
})
