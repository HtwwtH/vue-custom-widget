<template>
  <transition name='fade'>
    <div v-if='mounted' class='coin widget'>
      <button
        class='widget__delete'
        title='delete widget'
        @click='onDeleteClick'
      >
        <img
          :src='DeleteIcon'
          alt='delete widget'
        >
      </button>

      <p class='widget__title'>Exchange rate</p>

      <p class='widget__subtitle'>Check the currency:</p>
      <select
        name='select-coin'
        class='coin__select'
        :value="selected"
        @change="onChangeSelected"
      >
        <option
          v-for="(value, name) in symbols"
          :key="value"
        >
          {{ name }}
          </option>
      </select>

      <p class='widget__subtitle'>Convert to:</p>
      <select
        name='select-coin'
        class='coin__form'
        :value="convertTo"
        @change="onChangeConvertTo"
      >
        <option
          v-for="(value, name) in symbols"
          :key="value"
        >
          {{ name }}
          </option>
      </select>

      <p class='coin__converter'>1 {{ selected }} = {{ converted }} {{ convertTo }}</p>

    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useCoin } from '@/hooks/widgets/useCoin'

export default {
  name: 'CoinWidget',

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, convertTo, converted, symbols, getSymbolsList, getConvertedResult } = useCoin()
    const mounted = ref(false)

    const onDeleteClick = () => emit('removeWidget', props.id)

    onMounted(() => {
      getSymbolsList()
      getConvertedResult()
      mounted.value = true
    })

    const onChangeSelected = (e) => {
      selected.value = e.target.value
      getConvertedResult()
    }

    const onChangeConvertTo = (e) => {
      convertTo.value = e.target.value
      getConvertedResult()
    }

    return {
      mounted,
      DeleteIcon,
      symbols,
      selected,
      convertTo,
      converted,
      onDeleteClick,
      onChangeSelected,
      onChangeConvertTo
    }
  }
}
</script>

<style scoped lang='scss'>
  .coin {
    width: 184px;
    height: fit-content;

    select {
      width: 55px;
    }

    &__converter {
      margin: 8px auto 0;
      font-size: 14px;
    }
  }
</style>
