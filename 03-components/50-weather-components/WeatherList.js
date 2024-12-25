import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    weather: {
      type: Array,
      required: true,
    },
  },

  template: `
      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="weatherItem in weather" :weather-item="weatherItem">
      </ul>
  `,
})
