<template>
  <div
    class='coin widget'
    :class="{'widget--error': coinError}"
  >
    <div class="widget__header">
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
    </div>

    <div
      v-if="isLoading"
      class="loader"
    >
      <circle2 :background="'#93c2ff'" :color="'#fff'"/>
    </div>

    <div v-else class="widget__content">

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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useCoin } from '@/hooks/widgets/useCoin'
import { Circle2 } from 'vue-loading-spinner'
import symbols from '@/helpers/static/symbols.json'

export default {
  name: 'CoinWidget',

  components: {
    Circle2
  },

  emits: ['removeWidget'],

  props: {
    id: Number
  },

  setup (props, { emit }) {
    const { selected, convertTo, converted, getConvertedResult, coinError, clearErrors } = useCoin()
    const isLoading = ref(true)

    const onDeleteClick = () => {
      clearErrors()
      emit('removeWidget', props.id)
    }

    onMounted(async () => {
      await getConvertedResult()
      isLoading.value = false
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
      isLoading,
      DeleteIcon,
      symbols,
      selected,
      convertTo,
      converted,
      onDeleteClick,
      onChangeSelected,
      onChangeConvertTo,
      coinError
    }
  }
}
</script>

<style scoped lang='scss'>
  .coin {
    width: 184px;
    height: fit-content;
    min-height: 148px;

    select {
      width: 55px;
    }

    &__converter {
      margin: 8px auto 0;
      font-size: 14px;
    }
  }
</style>
