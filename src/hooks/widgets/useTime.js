import { ref } from 'vue'

export function useTime () {
  const selected = ref('Asia/Krasnoyarsk')

  return { selected }
}
