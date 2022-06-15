import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5'
})

export const getCityWeather = async (id) => {
  return await instance.get(`/forecast?id=${id}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`)
}
