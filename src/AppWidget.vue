<template>
  <div class="widget">
    <div
      v-if="!widgets.length"
      class="widget__placeholder"
    >
      Add a widget...
    </div>

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

    <div class="widget__add">
      <button
        title="Add a widget"
        @click="openWidgetMenu"
        class="widget__button"
      >
        +
      </button>

      <widget-menu
        v-if="widgetMenuVisible"
        @closeMenu="closeMenu"
        @addWidget="addWidget"
      />
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import WidgetMenu from '@/components/WidgetMenu.vue'

import { useWidget } from '@/hooks/useWidget'

export default {
  name: 'AppWidget',

  components: {
    draggable,
    WidgetMenu
  },

  setup () {
    const { widgets, addWidget } = useWidget()
    const drag = ref(false)
    const widgetMenuVisible = ref(false)

    function openWidgetMenu () {
      openMenu()
    }

    const openMenu = () => {
      widgetMenuVisible.value = true
    }

    const closeMenu = () => {
      widgetMenuVisible.value = false
    }

    return {
      drag,
      widgets,
      widgetMenuVisible,
      openWidgetMenu,
      openMenu,
      closeMenu,
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

    &__placeholder {
      margin-right: 12px;

      font-size: 24px;
      font-weight: bold;
      color: $light-blue;
    }

    &__add {
      position: relative;
    }

    &__button {
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

      transition: $transition;

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
