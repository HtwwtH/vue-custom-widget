<template>
  <transition name='fade'>
    <div class="time widget">
      <button
        class='widget__delete'
        title='delete widget'
        @click='onDeleteClick'
      >
        <img
          :src='DeleteIcon'
          alt='delete widget'
        >
      </button>

      <p class="widget__title">Time</p>

      <p class='widget__subtitle'>Check the timezone:</p>

      <select
        name='select-city'
        class='city__select'
        :value="selected"
        @change="onChangeCity"
      >
        <option
          v-for="(timezone) in timezones"
          :key="timezone"
        >
          {{ timezone }}
          </option>
      </select>

      <p class='widget__subtitle'>Time here is:</p>

      <time-clock />

    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import TimeClock from '@/components/TimeClock.vue'
import { useTime } from '@/hooks/widgets/useTime'

export default {
  name: 'TimeWidget',

  components: {
    TimeClock
  },

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, timezones, getTimezones } = useTime()

    const onDeleteClick = () => emit('removeWidget', props.id)
    const mounted = ref(false)

    onMounted(() => {
      getTimezones()
      mounted.value = true
    })

    return {
      DeleteIcon,
      onDeleteClick,
      selected,
      timezones
    }
  },

  methods: {
    increment () {
      this.counter++
    },
    decrement () {
      this.counter--
    }
  }
}
</script>

<style scoped lang="scss">
  .time {

  }
</style>
