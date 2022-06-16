import { ref } from 'vue'
import { getConverted } from '@/helpers/api/coin'

export function useCoin () {
  const selected = ref('USD')
  const convertTo = ref('RUB')
  const converted = ref('...')

  const getConvertedResult = async () => {
    await getConverted(convertTo.value, selected.value).then((response) => {
      converted.value = response.data.result
    }, (error) => {
      console.error(error)
    })
  }

  return { selected, convertTo, converted, getConvertedResult }
}
