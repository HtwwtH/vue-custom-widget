import { ref } from 'vue'

const timeError = ref(false)

export function useTime () {
  const selected = ref('Asia/Krasnoyarsk')

  return { selected, timeError }
}
