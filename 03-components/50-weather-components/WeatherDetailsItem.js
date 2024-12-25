import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-details__item">
      <div class="weather-details__item-label">{{ title }}</div>
      <div class="weather-details__item-value">{{ value }}</div>
    </div>
  `,
})
