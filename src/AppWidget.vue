<template>
  <div class="widget-main">
    <transition name="fadein">
      <div
        v-if="isPlaceholderVisible"
        class="widget-main__placeholder"
      >
        Add a widget...
      </div>
    </transition>

    <draggable
      v-model="widgets"
      animation="300"
      drag-class="drag"
      ghost-class="ghost"
      easing="cubic-bezier(1, 0, 0, 1)"
      :handle="mobileScreen ? '.handle' : ''"
      @change="onChange"
      @end="onEnd"
      class="widget-main__content"
    >
      <transition-group
        name="fade"
      >
        <div
          class="handle-wrapper"
          v-for="(element) in widgets"
          :key="element.createdAt"
        >
          <div v-if="mobileScreen" class="handle">
            <img src="@/assets/icons/menu.png" alt="">
          </div>
          <component
            class="draggable"
            :is="element.type"
            :id="element.id"
            @removeWidget="removeWidget"
          ></component>
        </div>
      </transition-group>
    </draggable>

    <div class="widget-main__add">
      <button
        title="Add a widget"
        @click="openMenu"
        class="widget-main__button"
      >
        +
      </button>

      <widget-menu
        v-if="widgetMenuVisible"
        @closeMenu="closeMenu"
        @addWidget="addWidget"
      />
    </div>

  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import WidgetMenu from '@/components/WidgetMenu.vue'
import { useWidget } from '@/hooks/useWidget'

export default {
  components: {
    draggable: VueDraggableNext,
    WidgetMenu
  },

  setup () {
    const { widgets, addWidget, moveWidget, removeWidget } = useWidget()
    const mobileScreen = ref(false)
    const drag = ref(false)
    const widgetMenuVisible = ref(false)

    const isPlaceholderVisible = ref(true)
    const isArrEmpty = computed(() => widgets.value.length === 0)

    const updateWidth = (size) => {
      mobileScreen.value = size
    }

    onMounted(() => {
      window.addEventListener('resize', updateWidth(window.innerWidth <= 768))
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateWidth(window.innerWidth <= 768))
    })

    watch(() => isArrEmpty.value,
      (val, prevVal) => {
        if (prevVal === true) {
          isPlaceholderVisible.value = false
        } else {
          setTimeout(() => { isPlaceholderVisible.value = true }, 500)
        }
      })

    const openMenu = () => {
      widgetMenuVisible.value = true
    }

    const closeMenu = () => {
      widgetMenuVisible.value = false
    }

    // it's a hack because of #28 issue
    let theFirstMove = true

    const onChange = (evt) => {
      if (!theFirstMove) {
        moveWidget(evt.oldIndex, evt.newIndex)
      }
    }

    const onEnd = (evt) => {
      if (theFirstMove && widgets.value[evt.oldIndex]) {
        moveWidget(evt.oldIndex, evt.newIndex)
        theFirstMove = false
      }
    }

    return {
      drag,
      mobileScreen,
      widgets,
      isPlaceholderVisible,
      widgetMenuVisible,
      openMenu,
      closeMenu,
      addWidget,
      moveWidget,
      removeWidget,
      onChange,
      onEnd
    }
  }
}
</script>

<style lang="scss">
  .widget-main {
    width: fit-content;
    max-width: 90vw;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: .5px;
    background-color: $blue;
    border-radius: 8px;
    padding: 16px;

    display: flex;
    align-items: center;

    @include mobile {
      flex-direction: column;
    }

    &__placeholder {
      margin-right: 12px;

      font-size: 24px;
      font-weight: bold;
      color: $light-blue;
    }

    &__add {
      position: relative;

      @include mobile {
        margin-top: 12px;
      }
    }

    &__button {
      width: 48px;
      height: 48px;
      margin: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: transparent;
      border: 4px solid $light-blue;
      border-radius: 4px;

      font-size: 42px;
      font-weight: bold;
      color: $light-blue;

      transition: $transition;

      &:hover {
        color: $white;
        border-color: $white;
      }
    }

    &__content {
      display: flex;
      flex-wrap: wrap;

      @include mobile {
        flex-direction: column;
      }
    }
  }

  .draggable {
    background: $white;
    padding: 10px;
    margin: 10px;
    border: 1px solid $gray;
    cursor: move;
  }
  .drag {
    background: $dark-blue;
    border-radius: 4px;
  }
  .ghost {
    opacity: 0.5;
    background: $dark-blue;
    border-radius: 4px;
  }

  .fade-item {
    display: inline-block;
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .fadein-enter-active {
    animation: placeholder-animation 0.5s;

    .inner {
      transition-delay: 0.5s;
    }
  }

  .handle-wrapper {
    @include mobile {
      display: flex;
      align-items: center;
    }
  }

  .handle {
    width: 24px;

    img {
      width: 100%;
    }
  }

  @keyframes placeholder-animation {
    from {
      opacity: 0;
      transform: translateY(-80px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
