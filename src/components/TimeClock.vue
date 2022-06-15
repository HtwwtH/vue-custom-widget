<template>
<div class="container">
  <div class="clock-inner">
    <div class="hour">{{hours}}</div>
    <div class="dots">:</div>
    <div class="min">{{minutes}}</div>
    <div class="dots">:</div>
    <div class="secs">{{seconds}}</div>
    <div class="mode"></div>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'TimeClock',

  setup (props) {
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)

    const setTime = () => {
      setInterval(() => {
        const date = new Date()
        hours.value = date.getHours()
        minutes.value = checkSingleDigit(date.getMinutes())
        seconds.value = checkSingleDigit(date.getSeconds())
      }, 1000)
    }

    const checkSingleDigit = (digit) => {
      return ('0' + digit).slice(-2)
    }

    onMounted(() => {
      setTime()
    })

    return {
      hours,
      minutes,
      seconds
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    margin: 12px auto 0;
  }
  .hour, .min, .secs {
    font-size: 24px;
  }
  p {
    font-family: 'Lucida Sans', sans-serif;
    font-size: 20px;
  }
  .clock-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    margin: 0 auto;

    background: $dark-blue;
    border-radius: 12px;
    color: $white;
  }
  .dots {
    font-size: 24px;
  }
</style>
