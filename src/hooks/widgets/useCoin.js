import { ref } from 'vue'
import { getConverted } from '@/helpers/api/coin'

export function useCoin () {
  const selected = ref('USD')
  const convertTo = ref('RUB')
  const converted = ref('...')

  const getConvertedResult = async () => {
    const res = await getConverted(convertTo.value, selected.value)
    if (res && res.status === 200) {
      converted.value = res.data.result
    } else {
      converted.value = 'Error'
    }
  }

  return { selected, convertTo, converted, getConvertedResult }
}
