import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operator = ref('sum')
    const firstOperand = ref(0)
    const secondOperand = ref(0)

    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value
        case 'subtract':
          return firstOperand.value - secondOperand.value
        case 'multiply':
          return firstOperand.value * secondOperand.value
        case 'divide':
          return firstOperand.value / secondOperand.value
      }
      return 0
    })

    return {
      operator,
      firstOperand,
      secondOperand,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
