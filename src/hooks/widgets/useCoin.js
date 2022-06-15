import { ref } from 'vue'
import { getSymbols, getConverted } from '@/helpers/api/coin'

export function useCoin () {
  const selected = ref('USD')
  const convertTo = ref('RUB')
  const converted = ref('...')

  const symbols = ref({})

  const getSymbolsList = async () => {
    await getSymbols().then((response) => {
      symbols.value = response.data.symbols
    }, (error) => {
      console.error(error)
    })
  }

  const getConvertedResult = async () => {
    await getConverted(convertTo.value, selected.value).then((response) => {
      converted.value = response.data.result
    }, (error) => {
      console.error(error)
    })
  }

  return { selected, convertTo, converted, symbols, getSymbolsList, getConvertedResult }
}
