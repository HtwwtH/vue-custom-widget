<template>
  <div
    class="time widget"
    :class="{'widget--error': timeError}"
    >
    <div class="widget__header">
      <button
        class='widget__delete'
        title='delete widget'
        @click="onDeleteClick"
      >
        <img
          :src='DeleteIcon'
          alt='delete widget'
        >
      </button>

      <p class="widget__title">Time</p>
    </div>

    <div
      v-if="isLoading"
      class="loader"
    >
      <circle2 :background="'#93c2ff'" :color="'#fff'"/>
    </div>

    <div v-else class="widget__content">
      <p class='widget__subtitle'>Check the timezone:</p>

      <select
        name='select-city'
        class='time__select'
        :value="selected"
        @change="onChangeTimezone"
      >
        <option
          v-for="(timezone) in timezones"
          :key="timezone"
        >
          {{ timezone }}
          </option>
      </select>

      <p class='widget__subtitle'>Time here is:</p>

      <time-clock :timezone="selected"/>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import TimeClock from '@/components/TimeClock.vue'
import { Circle2 } from 'vue-loading-spinner'
import { useTime } from '@/hooks/widgets/useTime'
import timezones from '@/helpers/static/timezones'

export default {
  name: 'TimeWidget',

  components: {
    TimeClock,
    Circle2
  },

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, timeError, clearErrors } = useTime()

    const onDeleteClick = () => {
      clearErrors()
      emit('removeWidget', props.id)
    }

    const handlers = {
      mousedown: onDeleteClick,
      touchstart: onDeleteClick
    }

    const isLoading = ref(true)

    onMounted(async () => {
      isLoading.value = false
    })

    const onChangeTimezone = (e) => {
      selected.value = e.target.value
    }

    return {
      handlers,
      DeleteIcon,
      timeError,
      isLoading,
      onDeleteClick,
      onChangeTimezone,
      selected,
      timezones
    }
  }
}
</script>

<style scoped lang="scss">
  .time {
    width: 249px;
    height: 163px;

    &__select {
      @include mobile {
        height: 36px;
      }
    }
  }
</style>
