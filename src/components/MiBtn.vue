<template>
  <button class="q-btn"
    :type="type"
    :class="classes"
    :disabled="disabled || disabledInternally"
    :data-disabled="submitText || buttonText"

    @click="handleClick"
    @mousedown.left="startHoldInterval"
    @touchstart="startHoldInterval"

    @mouseup="stopHoldInterval"
    @touchend="stopHoldInterval"
    @mouseleave="stopHoldInterval"
    @touchcancel="stopHoldInterval"
    >
    <slot>{{ counter ? holdText : buttonText }}</slot>
    <span class="q-btn__progress"
      :style="{ transform: `scaleX(${progress})` }"
      v-if="holdLimit"
      v-show="counter"></span>
  </button>
</template>

<script>
let interval

export default {
  name: 'q-button',
  data () {
    return {
      disabledInternally: null,
      counter: 0
    }
  },
  props: {
    submitText: String,
    buttonText: String,
    holdText: String,
    preventRevert: Boolean,
    holdToSubmit: Boolean,
    secondary: Boolean,
    transparent: Boolean,
    small: Boolean,
    danger: Boolean,
    disabled: Boolean,
    holdLimit: {
      type: Number,
      default: 1000
    },
    type: {
      type: String,
      default: 'button',
      validator: t => ['button', 'submit', 'reset'].includes(t)
    }
  },
  computed: {
    classes () {
      return {
        'q-btn--secondary': this.secondary,
        'q-btn--small': this.small,
        'q-btn--danger': this.danger,
        'q-btn--confirming': interval
      }
    },
    progress () {
      const progress = (this.counter || 1) / this.holdLimit * 45
      return progress
    }
  },
  watch: {
    counter () {
      if (this.counter >= this.holdLimit) {
        this.stopHoldInterval()
        this.click()
      }
    }
  },
  methods: {
    handleClick (e) {
      if (this.holdToSubmit) return
      this.click(e)
    },
    click (e) {
      this.disabledInternally = true
      this.$emit('click', e)

      !this.preventRevert && setTimeout(() => {
        this.disabledInternally = null
      }, 2000)
    },
    startHoldInterval () {
      if (!interval && this.holdToSubmit) {
        interval = setInterval(() => {
          this.counter += 50
        }, 50)
      }
    },
    stopHoldInterval () {
      clearInterval(interval)
      interval = null
      this.counter = 0
    }
  }
}
</script>

<style lang="scss">
.q-btn {
  --color: var(--gray-45);

  position: relative;
  border: none;
  background-color: var(--color);
  border: 2px solid var(--color);
  color: var(--gray);
  width: 100%;
  padding: 1rem;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: color .2s ease-out, background-color .3s ease-out;
  transition-delay: .3s;
  z-index: 0;
  &::after {
    content: attr(data-disabled);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transform: translateY(20px);
    transition: opacity .3s ease-out, transform .3s ease-out;
  }
  &[disabled] {
    cursor: not-allowed;
    color: transparent;
    --color: #8A98EE;
    transition-delay: 0s;

    &::after {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &--secondary {
    background-color: transparent;
    color: var(--color);

    &[disabled]::after {
      color: var(--color);
    }
  }
  &--danger {
    background-color: tomato;
    border-color: tomato;

    &[disabled] {
      background-color: #ff8e7a;
    }
  }
  &--small {
    display: inline-block;
    width: auto;
    padding: .5rem 1.25rem;
  }

  &__progress {
    display: block;
    position: absolute;
    bottom: -2px;
    left: -2px;
    background-color: #ffffff60;
    height: .5rem;
    width: 10px;
    transform-origin: 0;
    z-index: 2;
    transition: transform .4s linear;

    &[disabled]::after {
      color: var(--color);
    }
  }
}
</style>
