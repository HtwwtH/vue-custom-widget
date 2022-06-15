<template>
  <div class="time">
    <p class="opo">Time</p>
    <p>{{ counter }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'

export default {
  name: 'TimeWidget',

  emits: ['removeWidget'],

  props: {
    id: Number
  },

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
    border-radius: 4px;

    text-align: center;
  }
</style>
