import { ref, shallowRef } from 'vue'
import CoinComponent from '@/components/Widgets/CoinWidget.vue'
import TimeComponent from '@/components/Widgets/TimeWidget.vue'
import WeatherComponent from '@/components/Widgets/WeatherWidget.vue'

const CoinWidget = shallowRef(CoinComponent)
const TimeWidget = shallowRef(TimeComponent)
const WeatherWidget = shallowRef(WeatherComponent)

export function useWidget () {
  const widgets = ref([])
  const widgetsCounter = ref(0)

  const addWidget = (option) => {
    const date = new Date()
    if (option === 'coin') {
      widgets.value.push({
        createdAt: date,
        type: CoinWidget,
        id: widgetsCounter.value++
      })
    }
    if (option === 'time') {
      widgets.value.push({
        createdAt: date,
        type: TimeWidget,
        id: widgetsCounter.value++
      })
    }
    if (option === 'weather') {
      widgets.value.push({
        createdAt: date,
        type: WeatherWidget,
        id: widgetsCounter.value++
      })
    }

    console.log(widgets.value)
  }

  const removeWidget = (id) => {
    const removeIndex = widgets.value.map((item) => { return item.id }).indexOf(id)
    widgets.value.splice(removeIndex, 1)
    widgetsCounter.value = widgets.value.length

    widgets.value.map((item, i) => {
      item.id = i
      return item
    })

    console.log(widgets.value)
  }

  const moveWidget = (from, to) => {
    console.log('from to', from, to)

    const item = widgets.value.splice(from, 1)[0]

    console.log('item', item)

    widgets.value.splice(to, 0, item)

    // widgets.value.map((item, i) => {
    //   item.id = i
    //   return item
    // })

    console.log(widgets.value)
  }

  return { widgets, addWidget, moveWidget, removeWidget }
}
