import { defineComponent, ref, computed, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(new Date())

    const currentTimeString = computed(() => {
      return new Intl.DateTimeFormat(navigator.language, {
        timeStyle: 'medium',
      }).format(currentTime.value)
    })

    const interval = setInterval(() => (currentTime.value = new Date()), 1000)

    onBeforeUnmount(() => clearInterval(interval))

    return {
      currentTimeString,
    }
  },

  template: `<div class="clock">{{ currentTimeString }}</div>`,
})
