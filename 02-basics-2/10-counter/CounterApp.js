import { defineComponent, ref } from 'vue'

const counter = ref(0)

export default defineComponent({
  name: 'CounterApp',

  setup() {
    return {
      counter,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter === 0"
        @click="counter -= 1"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter === 5"
        @click="counter += 1"
      >➕</button>
    </div>
  `,
})
