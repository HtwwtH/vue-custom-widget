<template>
  <div class="coin">
    <p class="coin__title">Exchange rate</p>
    <p class="coin__subtitle">Check the currency:</p>
    <select name="select-coin" class="coin__form">
      <option>Dollar</option>
      <option>Euro</option>
      <option>Iena</option>
    </select>
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
    background-color: $white;
    padding: 8px;
    margin: 0 8px;
    border-radius: 4px;

    text-align: center;

    &__subtitle {
      margin: 4px auto;
      font-size: 12px;
    }
  }
</style>
