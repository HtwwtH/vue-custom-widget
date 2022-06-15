import { ref, computed } from 'vue'
import { getCityWeather } from '@/helpers/api/weather'

export function useWeather () {
  const selected = ref('Krasnoyarsk')
  const temperature = ref('')
  const iconId = ref('')

  const weatherImg = computed(() => {
    return `http://openweathermap.org/img/wn/${iconId.value}@2x.png` || ''
  })

  const cities = {
    Bryansk: 571476,
    Krasnoyarsk: 1502026,
    Moscow: 524901,
    Murmansk: 524305,
    Novosibirsk: 1496747,
    Yekaterinburg: 1486209
  }

  const getWeather = async () => {
    await getCityWeather(cities[selected.value]).then((res) => {
      console.log(res.data)
      temperature.value = res.data.list[0].main.temp
      iconId.value = res.data.list[0].weather[0].icon
    }, (error) => {
      console.error(error)
    })
  }

  return { selected, temperature, iconId, weatherImg, cities, getWeather }
}
