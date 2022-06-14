<template>
  <div class="widget">
    <draggable
      v-model="widgets"
      @start="drag=true"
      @end="drag=false"
      item-key="id"
      class="widget__content"
    >
      <template #item="{ element }">
        <component :is="element.type"></component>
      </template>
    </draggable>

    <!-- <template v-for="(widget, index) in widgets" :key="index">
      <component :is="widget.type"></component>
    </template> -->

    <button
      title="Add a widget"
      @click="addWidget"
      class="widget__add"
    >
      +
    </button>

    <widget-menu />

  </div>
</template>

<script>
import { ref, shallowRef } from 'vue'
import draggable from 'vuedraggable'
import CoinComponent from '@/components/Widgets/CoinWidget.vue'
import TimeComponent from '@/components/Widgets/TimeWidget.vue'
import WeatherComponent from '@/components/Widgets/WeatherWidget.vue'
import WidgetMenu from '@/components/WidgetMenu.vue'

const CoinWidget = shallowRef(CoinComponent)
const TimeWidget = shallowRef(TimeComponent)
const WeatherWidget = shallowRef(WeatherComponent)

export default {
  name: 'AppWidget',

  components: {
    draggable,
    WidgetMenu
  },

  setup () {
    const drag = ref(false)
    const widgetsCounter = ref(0)

    const widgets = ref([
      {
        type: WeatherWidget,
        id: widgetsCounter.value++
      }
    ])

    function addWidget () {
      console.log('addWidget')
      widgets.value.push({
        type: TimeWidget,
        id: widgetsCounter.value++
      })
    }

    return {
      drag,
      widgets,
      addWidget
    }
  }
}
</script>

<style lang="scss">
  .widget {
    width: fit-content;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: .5px;
    background-color: $blue;
    border-radius: 8px;
    padding: 16px;

    display: flex;
    align-items: center;

    &__add {
      width: 48px;
      height: 48px;
      margin: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: transparent;
      border: 4px solid $light-blue;
      border-radius: 4px;

      font-size: 42px;
      font-weight: bold;
      color: $light-blue;

      transition: all .3s ease-in-out;

      &:hover {
        color: $white;
        border-color: $white;
      }
    }

    &__content {
      display: flex;
    }
  }
</style>
