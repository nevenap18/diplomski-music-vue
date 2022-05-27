<template>
  <button class="logout-button" @click="$emit('click')">{{ label }}</button>
</template>

<script>
  export default {
    name: 'MainWrapper',
    props: {
      label: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
button {
  display: inline-block;
  padding: 10px 30px;
  background: transparent;
  border: transparent;
  border-radius: 4px;
  background: $cream;
  font: $font-regular-bold;
  color: $forest;
  cursor: pointer;
  &:hover {
    transition: $transition;
    background: $gold;
  }
}
</style>
