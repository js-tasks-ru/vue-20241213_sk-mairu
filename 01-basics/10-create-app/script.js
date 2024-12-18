import { defineComponent, createApp } from 'vue'

function getCurrentDateLocalised() {
  const date = new Date()
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'long',
  }).format(date)
}

const App = defineComponent({
  name: 'App',
  setup() {
    return {
      date: getCurrentDateLocalised(),
    }
  },

  template: `Сегодня {{ date }}`,
})

const app = createApp(App)
app.mount('#app')
