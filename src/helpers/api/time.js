import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://worldtimeapi.org/api'
})

export const getTimezonesList = async () => {
  return await instance.get('/timezone')
}

export const getCityWeather = async (id) => {
  return await instance.get(`/forecast?id=${id}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`)
}
