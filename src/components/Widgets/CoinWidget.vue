<template>
  <div class="coin">
    <p class="opo">Coin</p>
    <p>{{ counter }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'CoinWidget',

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
  .coin {
    width: 100px;
    background-color: $white;
    padding: 8px;
    margin: 0 8px;

    text-align: center;
  }
</style>
