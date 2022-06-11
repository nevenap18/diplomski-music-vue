<template>
  <div class="login-wrapper">
    <svgs/>
    <div class="form-wrapper">
      <div class="logo">
        <svg class="logo-svg">
          <use href="#logo"></use>
        </svg>
        <span class="title">MusicApp</span>
      </div>
      <form @submit.prevent>
        <div class="container">
          <label for="name"><b>Username</b></label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="name"
            :value="username"
            @input="username = $event.target.value"
            @focus="resetError"
            autocomplete="off"
            required
          >
          <label for="pass"><b>Password</b></label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="pass"
            :value="password"
            @input="password = $event.target.value"
            @focus="resetError"
            autocomplete="off"
            required
          >

          <button class="button-login" type="submit" :class="{disabled: !username || !password}" @click="loginAction">Submit</button>
          <button class="button-register" @click="goToRegister">Go to Register page</button>
          <p v-if="errorLogin" class="error">{{errorMessage}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Auth from '../../helpers/repo/Auth.js'
import Svgs from '../svg/Svgs'

export default {
  name: 'Login',
  props: {
  },
  components: {
    Svgs
  },
  data () {
    return {
      username: '',
      password: '',
      errorLogin: false,
      errorMessage: ''
    }
  },
  methods: {
    resetError () {
      this.errorLogin = false
      this.errorMessage = ''
    },
    loginAction () {
      if (!this.username || !this.password) {
        this.errorMessage = 'Please complete the form'
        this.errorLogin = true
        return
      }
      const auth = new Auth()
      auth.login(this.username, this.password).then(res => {
        document.cookie = `token=${res.access_token}`
        this.$router.push({name: 'Home'})
        // set token to store
      }).catch(() => {
        this.errorLogin = true
        this.errorMessage = 'Error, check credentials.'
      })
    },
    goToRegister () {
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.login-wrapper {
  min-width: 1024px;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: $forest;
  background-size: cover;
}
.form-wrapper {
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 400px;
  max-width: 700px;
  display: flex;
  padding: 30px;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  position: absolute;
  background: $cream;
  top: 50%;
  left: 50%;
  font: $font-regular;
  color: $forest;
  border-radius: 4px;
  filter: $shadow;
}
.container {
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input[type=text], input[type=password] {
  outline: none;
  background: transparent;
  border-width: 0 0 2px;
  border-color: $forest;
  transition: $transition;
  width: 100%;
  padding: 5px 5px;
  margin: 15px 0 40px 0;
  display: inline-block;
  box-sizing: border-box;
  font: $font-regular;
  color: $moss;
}
input:focus {
  border-color: $moss;
}
input:-webkit-autofill { 
  -webkit-background-clip: text;
  background-clip: text;
}
button {
  display: inline-block;
  padding: 10px 30px;
  margin-right: 15px;
  background: transparent;
  border: transparent;
  border-radius: 4px;
  background: $moss;
  font: $font-regular;
  color: $cream;
  cursor: pointer;
}
.button-register {
  background: transparent;
  text-decoration: underline;
  color: $moss;
}
.disabled {
  cursor: auto;
  pointer-events: none;
  opacity: 0.7;
  transition: $transition;
}
.error {
  color: $error;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
  .logo-svg {
    width: 40px;
    height: 40px;
    fill: $forest;
    margin-right: 10px;
  }
  .title {
    font: $font-large-bold;
    color: $forest;
  }
  &:hover {
    transition: $transition;
    transform: scale(1.04);
  }
}
</style>
