<template>
  <div
    class="weather widget"
    :class="{'widget--error': weatherError}"
  >
    <div class="widget__header">
      <button
        class='widget__delete'
        title='delete widget'
        @click='onDeleteClick'
        @touchstart='onDeleteClick'
      >
        <img
          :src='DeleteIcon'
          alt='delete widget'
        >
      </button>

      <p class='widget__title'>Weather</p>
    </div>

    <div
      v-if="isLoading"
      class="loader"
    >
      <circle2 :background="'#93c2ff'" :color="'#fff'"/>
    </div>

    <div v-else class="widget__content">
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

      <div class="weather__image">
        <img
          v-if="iconId"
          class="weather__icon"
          :src="weatherImg" alt="weather icon"
        >
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useWeather } from '@/hooks/widgets/useWeather'
import { Circle2 } from 'vue-loading-spinner'
import cities from '@/helpers/static/cities'

export default {
  name: 'WeatherWidget',

  components: {
    Circle2
  },

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, temperature, iconId, weatherImg, getWeather, weatherError, clearErrors } = useWeather()

    const isLoading = ref(true)

    const onDeleteClick = () => {
      clearErrors()
      emit('removeWidget', props.id)
    }

    onMounted(async () => {
      await getWeather()
      isLoading.value = false
    })

    const onChangeCity = (e) => {
      selected.value = e.target.value
      getWeather()
    }

    return {
      isLoading,
      DeleteIcon,
      selected,
      cities,
      temperature,
      iconId,
      weatherImg,
      onChangeCity,
      onDeleteClick,
      weatherError
    }
  }
}
</script>

<style scoped lang="scss">
  .weather {
    width: 120px;
    height: 173px;

    &__temperature {
      margin: 8px auto 0;
    }

    &__image {
      width: 100%;
      margin: 0 auto;

      img {
        width: 64px;
      }
    }
  }
</style>
