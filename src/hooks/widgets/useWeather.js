import { ref, computed } from 'vue'
import { getCityWeather } from '@/helpers/api/weather'
import cities from '@/helpers/static/cities'

export function useWeather () {
  const selected = ref('Krasnoyarsk')
  const temperature = ref('')
  const iconId = ref('')

  const weatherImg = computed(() => {
    return `http://openweathermap.org/img/wn/${iconId.value}@2x.png` || ''
  })

  const getWeather = async () => {
    const res = await getCityWeather(cities[selected.value])
    if (res && res.status === 200) {
      temperature.value = res.data.list[0].main.temp
      iconId.value = res.data.list[0].weather[0].icon
    } else {
      temperature.value = 'Error'
    }
  }

  return { selected, temperature, iconId, weatherImg, getWeather }
}
