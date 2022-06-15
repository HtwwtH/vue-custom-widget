<template>
  <transition name='fade'>
    <div v-if="mounted" class="weather widget">
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

      <p class='widget__title'>Weather</p>

      <p class='widget__subtitle'>Check the city:</p>

      <select
        name='select-city'
        class='city__select'
        :value="selected"
        @change="onChangeCity"
      >
        <option
          v-for="(id, city) in cities"
          :key="id"
        >
          {{ city }}
          </option>
      </select>

      <div class="weather__temperature">
        {{ temperature }}°
      </div>

      <img
        v-if="iconId"
        class="weather__icon"
        :src="weatherImg" alt="weather icon"
      >

    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useWeather } from '@/hooks/widgets/useWeather'

export default {
  name: 'WeatherWidget',

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, temperature, iconId, weatherImg, cities, getWeather } = useWeather()

    const mounted = ref(false)

    const onDeleteClick = () => emit('removeWidget', props.id)

    onMounted(() => {
      getWeather()
      mounted.value = true
    })

    const onChangeCity = (e) => {
      selected.value = e.target.value
      getWeather()
    }

    return {
      mounted,
      DeleteIcon,
      selected,
      cities,
      temperature,
      iconId,
      weatherImg,
      onChangeCity,
      onDeleteClick
    }
  }
}
</script>

<style scoped lang="scss">
  .weather {
    height: 173px;

    &__temperature {
      margin: 8px auto 0;
    }

    &__icon {
      width: 64px;
    }
  }
</style>
