import { ref } from 'vue'

const timeError = ref(false)

export function useTime () {
  const selected = ref('Asia/Krasnoyarsk')

  const clearErrors = () => {
    timeError.value = false
  }

  return { selected, timeError, clearErrors }
}
