<template>
  <button :type="type" :disabled="disabled" :class="buttonClasses">{{ label }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
      validator: type => ['button', 'submit'].includes(type)
    },
    styleType: {
      type: String,
      required: false,
      default: 'Primary',
      validator: type => ['accent', 'flat'].includes(type)
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    buttonClasses () {
      return [
        'button',
        {
          accent: this.styleType === 'accent',
          flat: this.styleType === 'flat'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.button {
  display: inline-block;
  padding: 10px 30px;
  background: transparent;
  border-radius: $radius;
  cursor: pointer;

  &.accent {
    font: var(--font-medium);
    background: $color-accent;
    color: $font-normal;

    transition: $transition;

    &:hover {
      background: $color-accent-hover;
    }

    &:disabled {
      background: $color-accent;
      opacity: 0.4;
      transition: $transition;
      animation: none;
      cursor: auto;
    }
  }
  &.flat {
    font: var(--font-medium);
    color: $font-accent;
    box-shadow: inset 0px 0px 0px 1px $color-accent;

    &:hover {
      transition: $transition;
      color: $font-normal;
      background-color: $color-accent;
    }
  }
}
</style>
