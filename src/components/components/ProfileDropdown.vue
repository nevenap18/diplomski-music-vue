<template>
  <div @blur="closeDropdown" id="popup" tabindex="-1" class="dropdown">
    <div class="edit" @click="goToEdit">EDIT PROFILE</div>
    <div class="logout" @click="logout">LOGOUT</div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileDropdown',
    methods: {
      logout () {
        document.cookie = 'token=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
        this.$emit('closeDropdown')
        setTimeout(() => {
          this.$router.push({name: 'Login'})
        }, 500)
      },
      goToEdit () {
        this.$emit('closeDropdown')
        this.$router.push({name: 'Settings'})
      },
      closeDropdown () {
        this.$emit('closeDropdown')
      }
    },
    mounted () {
      this.$el.focus()
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  padding: 7px;
  background-color: $forest;
  position: absolute;
  top: 78px;
  right: 15px;
  font: $font-regular-bold;
  color: $cream;
  &::after, &::before {
      content: '';
      width: 19px;
      height: 19px;
      transform: rotate(45deg);
      position: absolute;
      top: -10px;
      right: 4px;
      background: $forest;
    }
}
.edit {
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: $dark-cream;
  }
}
.logout {
  cursor: pointer;
  &:hover {
    color: $dark-cream;
  }
}
</style>
