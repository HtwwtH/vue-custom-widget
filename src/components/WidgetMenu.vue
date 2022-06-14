<template>
  <div
    v-click-outside="onClickOutside"
    class="widget-menu"
  >
    <div
        v-for="(option, i) of widgetList"
        :key="i"
        @click="clickOption(option)"
        class="item"
      >
        {{ option.title }}
      </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'

export default {
  name: 'WidgetMenu',

  emits: ['addWidget', 'closeMenu'],

  directives: {
    clickOutside: vClickOutside.directive
  },

  setup (_, { emit }) {
    const widgetList = [
      {
        title: 'Exchange rate',
        key: 'coin'
      },
      {
        title: 'Time',
        key: 'time'
      },
      {
        title: 'Weather',
        key: 'weather'
      }
    ]

    const clickOption = (option) => {
      emit('addWidget', option.key)
      emit('closeMenu')
    }

    const onClickOutside = () => emit('closeMenu')

    return {
      widgetList,
      clickOption,
      onClickOutside
    }
  }
}
</script>

<style scoped lang="scss">
  .widget-menu {
    position: absolute;
    width: 160px;
    margin-top: 12px;

    background-color: $white;
    border: 1px solid $gray;
    border-radius: 4px;

    .item {
      cursor: pointer;
      padding: 8px 16px;
      transition: $transition;

      &:hover {
        background-color: $gray;
      }
    }
  }
</style>
