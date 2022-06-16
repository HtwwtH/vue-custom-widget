import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: {
    apikey: process.env.VUE_APP_COIN_API_KEY
  }
})

export const getConverted = (to, from) => {
  return instance.get(`/convert?to=${to}&from=${from}&amount=1`).catch(e => {
    console.error(e)
  })
}
