import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://worldtimeapi.org/api'
})

export const getTimezonesList = async () => {
  return await instance.get('/timezone')
}
