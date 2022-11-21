<template>
  <div class="input-text">
    <input
      :type="inputType"
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      @change="$emit('change', inputValue)"
      @focus="$emit('focus', $event)"
      @keydown="$emit('keydown', $event)"
      :required="requiredField"
      ref="input"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
import uuid from 'uuid/v4'

export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
      validator: type => ['text', 'password'].includes(type)
    },
    toggleType: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [String, Number],
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true,
      default: 'text'
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    requiredField: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      randomString: uuid(),
      inputType: this.type,
      inputValue: this.value
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.input-text {
  position: relative;
}


input {
  font: $font-regular;
  color: $font-normal;
  width: 100%;
  height: 32px;
  border: none;
  background: $input-background;
  border-radius: $radius;
  padding-left: 5px;
  outline: none;

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  &::-webkit-textfield-decoration-container {
    visibility: hidden;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }

  & ~ label {
    font: $font-regular;
    color: $font-normal;
    position: absolute;
    transform: translateY(-50%);
    top: -13px;
    left: 0;
    pointer-events: none;
    transition: $transition;
  }

  &::placeholder {
    font: $font-regular;
    color: $font-dull;
  }
}
</style>
