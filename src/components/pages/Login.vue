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
          <Input
            class="input"
            label="Username:"
            placeholder="Username"
            id="username"
            @change="username = $event"
            @focus="resetError"
            autocomplete="off"
          />
          <Input
            class="input"
            type="password"
            label="Password:"
            placeholder="Password"
            id="password"
            @change="password = $event"
            @focus="resetError"
            autocomplete="off"
          />
          <Button type="submit" styleType="accent" label="Login" :disabled="!formDataExists" @click.native="loginAction"/>
          <Button styleType="flat" label="Register" @click.native="goToRegister"/>
          <p v-if="errorLogin" class="error">{{errorMessage}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Auth from '../../helpers/repo/Auth.js'
import Svgs from '../svg/Svgs'
import Button from '../components/Button'
import Input from '../components/Input'

export default {
  name: 'Login',
  props: {
  },
  components: {
    Svgs,
    Button,
    Input
  },
  data () {
    return {
      username: '',
      password: '',
      errorLogin: false,
      errorMessage: ''
    }
  },
  computed: {
    formDataExists () {
      return !!this.username.length && !!this.password.length
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
  min-width: 750px;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: $background;
  background-size: cover;
}
.form-wrapper {
  transform: translate(-50%, -50%);
  width: 25vw;
  min-width: 300px;
  max-width: 700px;
  display: flex;
  padding: 70px 20px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background: $background-alternate;
  top: 50%;
  left: 50%;
  border-radius: $radius;
  filter: $shadow;
}
.container {
  margin-top: 40px;
  width: 18vw;
  min-width: 250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  margin-top: 30px;
  display: block;

}
button {
  display: block;
  width: 100%;
  margin-top: 24px;
}
.error {
  color: $error;
  &:first-letter {
    text-transform: uppercase;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  margin-bottom: 20px;
  .logo-svg {
    width: 45px;
    height: 45px;
    fill: $color-normal;
    margin-right: 10px;
  }
  .title {
    font: var(--font-large-bold);
    color: $font-normal;
    pointer-events: none;
  }
}
@media (min-width: 2000px) {
  .input {
    margin-top: 44px;
  }
  .logo {
    .logo-svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
