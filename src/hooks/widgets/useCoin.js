import { ref } from 'vue'
import { getConverted } from '@/helpers/api/coin'
import ErrorService from '@/helpers/services/errorService'

export function useCoin () {
  const selected = ref('USD')
  const convertTo = ref('RUB')
  const converted = ref('...')
  const coinError = ref(false)

  const getConvertedResult = async () => {
    const res = await getConverted(convertTo.value, selected.value)
    if (res && res.status === 200) {
      converted.value = res.data.result
    } else {
      converted.value = 'Error'
      coinError.value = true
      ErrorService.onError(res)
    }
  }

  const clearErrors = () => {
    coinError.value = false
  }

  return { selected, convertTo, converted, coinError, getConvertedResult, clearErrors }
}
