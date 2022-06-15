<template>
  <div class="widget">
    <div
      v-if="!widgets.length"
      class="widget__placeholder"
    >
      Add a widget...
    </div>

    <Sortable
      :list="widgets"
      :options="options"
      item-key="id"
      class="widget__content"
      @end="onEnd"
    >
      <template #item="{ element }">
        <component
          class="draggable"
          :is="element.type"
          v-bind="{id: element.id}"
          :key="element.id"
          @removeWidget="removeWidget"
        ></component>
      </template>
    </Sortable>

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
import { Sortable } from 'sortablejs-vue3'
import { ref, computed } from 'vue'
import WidgetMenu from '@/components/WidgetMenu.vue'

import { useWidget } from '@/hooks/useWidget'

export default {
  name: 'AppWidget',

  components: {
    Sortable,
    WidgetMenu
  },

  setup () {
    const { widgets, addWidget, moveWidget, removeWidget } = useWidget()
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

    const options = computed(() => {
      return {
        draggable: '.draggable',
        animation: 150,
        ghostClass: 'ghost',
        dragClass: 'drag'
      }
    })

    const onEnd = (evt) => {
      console.log('evt ', evt)
      console.log('oldDraggableIndex ', evt.oldDraggableIndex)
      console.log('newDraggableIndex ', evt.newDraggableIndex)
      moveWidget(evt.oldDraggableIndex, evt.newDraggableIndex)
    }

    return {
      drag,
      options,
      widgets,
      widgetMenuVisible,
      openWidgetMenu,
      openMenu,
      closeMenu,
      addWidget,
      moveWidget,
      removeWidget,
      onEnd
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

  .draggable {
    background: #fff;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    cursor: move;
  }
  .ghost {
    opacity: 0.5;
    background: #fff;
    border: 1px dashed #ccc;
  }
  .drag {
    background: #f5f5f5;
  }
</style>
