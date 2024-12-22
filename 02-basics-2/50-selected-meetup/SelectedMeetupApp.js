import { defineComponent, ref, computed, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupId = ref(1)
    const meetupData = ref(null)
    const meetupTitle = computed(() => {
      return meetupData.value?.title || ''
    })

    watch(
      meetupId,
      async () => {
        meetupData.value = await getMeetup(meetupId.value)
      },
      { immediate: true },
    )

    return {
      meetupId,
      meetupData,
      meetupTitle,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId === 1" @click="meetupId -= 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="item in 5" class="radio-group__button">
            <input
              :id="\`meetup-id-\${item}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="item"
              v-model="meetupId"
            />
            <label :for="\`meetup-id-\${item}\`" class="radio-group__label">{{ item }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupId === 5" @click="meetupId += 1">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>

    </div>
  `,
})
