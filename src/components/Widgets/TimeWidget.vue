<template>
  <div class="time">
    <p class="opo">Time</p>
    <p>{{ counter }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  name: 'TimeWidget',

  data () {
    return {
      counter: 0
    }
  },

  methods: {
    increment () {
      this.counter++
    },
    decrement () {
      this.counter--
    }
  }
}
</script>

<style scoped lang="scss">
  .time {
    width: 100px;
    background-color: $white;
    padding: 8px;
    margin: 0 8px;

    text-align: center;
  }
</style>
