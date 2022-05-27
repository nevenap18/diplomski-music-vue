<template>
  <div class="header">
    <input
      type="text"
      placeholder="Search"
      id="search"
      :value="searchValue"
      @input="searchValue = $event.target.value"
      autocomplete="off"
      required
    >
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
    },
    data () {
      return {
        searchValue: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: $gold;
  z-index: 500;
  padding-left: 300px;
}
input[type=text], input[type=password] {
  outline: none;
  background: transparent;
  outline: none;
  border-width: 0;
  border-bottom: 2px solid $forest;
  transition: $transition;
  width: 20%;
  min-width: 350px;
  max-width: 450px;
  padding: 5px 5px;
  margin: 20px;
  display: inline-block;
  box-sizing: border-box;
  font: $font-regular;
  color: $forest;
  &:hover {
    border-color: $moss
  }
  &:focus {
  border-color: $moss;
    &::placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: $forest;
  }
}

</style>
