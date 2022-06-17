import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
})

export const getCityWeather = (id) => {
  return instance.get(`/forecast?id=${id}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`).catch(e => {
    console.error(e)
    return e
  })
}
