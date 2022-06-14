import { ref, shallowRef } from 'vue'
import CoinComponent from '@/components/Widgets/CoinWidget.vue'
import TimeComponent from '@/components/Widgets/TimeWidget.vue'
import WeatherComponent from '@/components/Widgets/WeatherWidget.vue'

const CoinWidget = shallowRef(CoinComponent)
const TimeWidget = shallowRef(TimeComponent)
const WeatherWidget = shallowRef(WeatherComponent)

export function useWidget () {
  const widgetsCounter = ref(0)
  const widgets = ref([])

  const addWidget = (option) => {
    console.log(option)
    if (option === 'coin') {
      widgets.value.push({
        type: CoinWidget,
        id: widgetsCounter.value++
      })
    }
    if (option === 'time') {
      widgets.value.push({
        type: TimeWidget,
        id: widgetsCounter.value++
      })
    }
    if (option === 'weather') {
      widgets.value.push({
        type: WeatherWidget,
        id: widgetsCounter.value++
      })
    }
  }

  return { widgets, addWidget }
}
