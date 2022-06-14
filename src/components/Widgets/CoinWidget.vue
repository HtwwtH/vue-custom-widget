<template>
  <div class="coin">
    <button
      class="coin__delete"
      title="delete widget"
      @click="onDeleteClick"
    >
      <img
        :src="DeleteIcon"
        alt="delete widget"
      >
    </button>

    <p class="coin__title">Exchange rate</p>
    <p class="coin__subtitle">Check the currency:</p>
    <select name="select-coin" class="coin__form">
      <option>Dollar</option>
      <option>Euro</option>
      <option>Iena</option>
    </select>

  </div>
</template>

<script>
import DeleteIcon from '@/assets/icons/delete-icon.svg'

export default {
  name: 'CoinWidget',

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const onDeleteClick = () => emit('removeWidget', props.id)

    return {
      DeleteIcon,
      onDeleteClick
    }
  }
}
</script>

<style scoped lang="scss">
  .coin {
    position: relative;
    background-color: $white;
    padding: 8px;
    margin: 0 8px;
    border-radius: 4px;

    text-align: center;

    &__delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      padding: 8px;
      box-sizing: content-box;

      img {
        width: 100%;
      }
    }

    &__title {
      width: 70%;
      text-align: left;
    }

    &__subtitle {
      margin: 8px auto 4px;
      font-size: 12px;
    }
  }
</style>
