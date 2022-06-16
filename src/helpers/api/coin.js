import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: {
    apikey: process.env.VUE_APP_COIN_API_KEY
  }
})

export const getConverted = async (to, from) => {
  return await instance.get(`/convert?to=${to}&from=${from}&amount=1`)
}
