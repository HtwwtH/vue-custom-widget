<template>
  <div class="widget-menu">
    <div
        v-for="(option, i) of widgetList"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
        class="item"
      >
        {{ option }}
      </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetMenu',

  setup () {
    const widgetList = [
      'Exchange rate',
      'Time',
      'Weather'
    ]

    return {
      widgetList
    }
  }
}
</script>

<style scoped lang="scss">
  .widget-menu {
    background-color: $white;
    border: 1px solid $gray;
    border-radius: 4px;
  }
</style>
