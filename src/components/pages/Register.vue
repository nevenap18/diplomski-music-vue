<template>
  <div class="register-wrapper">
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
            label="Email:"
            placeholder="Email"
            id="email"
            @change="email = $event"
            @focus="resetError"
            autocomplete="off"
          />
          <Input
            class="input"
            label="Username"
            placeholder="Username:"
            id="username"
            :value="username"
            @focus="resetError"
            @change="username = $event"
            autocomplete="off"
          />
          <Input
            class="input"
            type="password"
            label="Password:"
            placeholder="Password"
            id="password"
            :value="password"
            @focus="resetError"
            @change="password = $event"
            autocomplete="off"
          />
          <Input
            class="input"
            type="password"
            label="Confirm password:"
            placeholder="Password"
            id="confirmed-password"
            :value="confirmedPassword"
            @focus="resetError"
            @change="confirmedPassword = $event"
            autocomplete="off"
          />
          <Button v-loader="loading" type="submit" styleType="accent" label="Register" :disabled="!username || !password || !confirmedPassword" @click.native="registerAction"/>
          <div class="login-text">
            <span>Already a registered user? <span @click="goToLogin" class="login-link">Login</span></span>
          </div>
          <p v-if="errorRegister" class="error">{{errorMessage}}</p>
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
  name: 'Register',
  props: {
  },
  components: {
    Svgs,
    Button,
    Input
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmedPassword: '',
      errorRegister: false,
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    resetError () {
      this.errorRegister = false
      this.errorMessage = ''
    },
    async registerAction () {
      this.loading = true
      if (!this.email || !this.username || !this.password || !this.confirmedPassword) {
        this.errorRegister = true
        this.errorMessage = 'Please complete the form.'
        return
      }
      if (this.password !== this.confirmedPassword) {
        this.errorRegister = true
        this.errorMessage = 'Confirmed password is incorrect.'
        return
      }
      const auth = new Auth()
      await auth.register(this.email, this.username, this.password).then(() => {
        setTimeout(() => {
          this.$router.push({name: 'Login'})
          this.loading = false
        }, 1000)
      }).catch(e => {
        this.errorRegister = true
        this.errorMessage = e.response.data.message[0]
        this.loading = false
      })
    },
    goToLogin () {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.register-wrapper {
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
.login-text {
  margin-top: 24px;
  font: var(--font-regular);
  color: $font-normal;
  text-align: center;

  .login-link {
    font: var(--font-regular-bold);
    color: $color-accent;
    cursor: pointer
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
