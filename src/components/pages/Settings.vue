<template>
  <div class="settings">
    <div class="avatar-container">
      <img
        v-if="profile"
        class="avatar"
        alt="avatar"
        :src="profile.image"
      />
      <span class="username">{{profile.username}}</span>
    </div>
    <div class="info">Account details</div>
    <form v-if="profile" @submit.prevent class="content">
      <Input
          class="input"
          label="Email:"
          placeholder="Email"
          id="title"
          :value="profile.email"
          @focus="resetError"
          @change="editedProfile.email = $event"
          autocomplete="off"
        />
        <Input
          class="input"
          type="text"
          label="Username:"
          placeholder="Username"
          id="username"
          :value="profile.username"
          @focus="resetError"
          @change="editedProfile.username = $event"
          autocomplete="off"
        />
        <Input
          type="text"
          label="New password:"
          placeholder="New password"
          id="new-password"
          @focus="resetError"
          @change="editedProfile.password = $event"
          autocomplete="off"
          :requiredField="false"
        />
        <Button v-loader="loadingSave" type="submit" styleType="accent" label="Save" @click.native="editAction"></Button>
        <Button v-loader="loadingLogout" styleType="flat" label="Logout" @click.native="logout"></Button>
        <p v-if="error" class="error">{{errorMessage}}</p>
    </form>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
export default {
  name: 'Settings',
  components: {
    Input,
    Button
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  data () {
    return {
      editedProfile: {
        username: '',
        email: '',
        password: ''
      },
      error: false,
      errorMessage: '',
      loadingSave: false,
      loadingLogout: false
    }
  },
  methods: {
    ...mapActions([
      'editProfile'
    ]),
    async editAction () {
      this.loadingSave = true
      await this.editProfile(this.editedProfile).catch(e => {
        this.error = true
        this.errorMessage = e.response.data.message[0]
      })
      this.loadingSave = false
    },
    resetError () {
      this.error = false
      this.errorMessage = ''
    },
    logout () {
      this.loadingLogout = true
      document.cookie = 'token=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
      setTimeout(() => {
        this.$router.push({name: 'Login'})
        this.loadingLogout = false
      }, 1500)
    }
  },
  created () {
    this.editedProfile.email = this.profile.email
    this.editedProfile.username = this.profile.username
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.avatar-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
}
.avatar {
  width: 30%;
  margin-right: 30px;
  object-fit: cover;
  border-radius: 50%;
}
.username {
  font: var(--font-large-bold);
  color: $font-normal;
}
.info {
  font: var(--font-large-bold);
  color: $font-dull;
  border-bottom: 2px solid $color-dull;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.settings {
  margin-top: 90px;
  margin-left: 150px;
  min-width: 300px;
  max-width: 500px;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-text {
  margin-top: 40px;
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
@media (min-width: 2000px) {
  .settings {
    min-width: 500px;
    max-width: 700px;
  }
  .input-text {
    margin-top: 60px;
    display: block;
  }
}
</style>
