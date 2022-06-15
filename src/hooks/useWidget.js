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
    console.log(widgets)
  }

  const removeWidget = (id) => {
    const removeIndex = widgets.value.map((item) => { return item.id }).indexOf(id)
    widgets.value.splice(removeIndex, 1)
    widgetsCounter.value = widgets.value.length

    widgets.value.map((item, i) => {
      item.id = i
      return item
    })
  }

  const moveWidget = (from, to) => {
    const item = widgets.value.splice(from, 1)[0]
    widgets.value.splice(to, 0, item)
  }

  return { widgets, addWidget, moveWidget, removeWidget }
}
