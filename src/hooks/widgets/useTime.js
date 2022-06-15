import { ref, computed } from 'vue'
import { getTimezonesList } from '@/helpers/api/time'

export function useTime () {
  const selected = ref('Asia/Krasnoyarsk')

  const timezones = ref([])

  const getTimezones = async () => {
    await getTimezonesList().then((res) => {
      timezones.value = res.data
    }, (error) => {
      console.error(error)
    })
  }

  return { selected, timezones, getTimezones }
}
