<template>
  <div class="widget-main">
    <div
      v-if="!widgets.length"
      class="widget-main__placeholder"
    >
      Add a widget...
    </div>

    <draggable
      class="widget-main__content"
      :list="widgets"
      @change="onChange"
      @end="onEnd"
    >
      <div
        v-for="(element) in widgets"
        :key="element.createdAt"
      >
      <component
        class="draggable"
        :is="element.type"
        :id="element.id"
        @removeWidget="removeWidget"
      ></component>
      </div>
    </draggable>

    <div class="widget-main__add">
      <button
        title="Add a widget"
        @click="openWidgetMenu"
        class="widget-main__button"
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
import { VueDraggableNext } from 'vue-draggable-next'
import { ref, computed } from 'vue'
import WidgetMenu from '@/components/WidgetMenu.vue'

import { useWidget } from '@/hooks/useWidget'

export default {
  components: {
    draggable: VueDraggableNext,
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

    // it's a hack because of #28 issue
    let theFirstMove = true

    const onChange = (evt) => {
      if (!theFirstMove) {
        moveWidget(evt.oldIndex, evt.newIndex)
      }
    }

    const onEnd = (evt) => {
      if (theFirstMove) {
        moveWidget(evt.oldIndex, evt.newIndex)
        theFirstMove = false
      }
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
      onChange,
      onEnd
    }
  }
}
</script>

<style lang="scss">
  .widget-main {
    width: fit-content;
    max-width: 90vw;
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
      flex-wrap: wrap;
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
