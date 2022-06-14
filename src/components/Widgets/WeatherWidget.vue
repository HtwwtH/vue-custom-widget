<template>
  <div class="weather">
    <p class="opo">Weather</p>
    <p>{{ counter }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidget',

  data () {
    return {
      counter: 0
    }
  },

  methods: {
    increment () {
      this.counter++
    }
  }
}
</script>

<style scoped lang="scss">
  .weather {
    width: 100px;
    background-color: $white;
    padding: 8px;
    margin: 0 8px;
    border-radius: 4px;

    text-align: center;
  }
</style>
