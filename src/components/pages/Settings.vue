<template>
  <div class="settings">
    <img
      v-if="profile"
      class="avatar"
      alt="avatar"
      :src="profile.image"
    />
    <div v-if="profile" class="content">
      <label for="email"><b>Email:</b></label>
      <input
        type="text"
        placeholder="email"
        id="email"
        :value="profile.email"
        @input="editedProfile.email = $event.target.value"
        autocomplete="off"
        required
      >
      <label for="username"><b>Username:</b></label>
      <input
        type="text"
        placeholder="username"
        id="username"
        :value="profile.username"
        @input="editedProfile.username = $event.target.value"
        autocomplete="off"
        required
      >
      <label for="pass"><b>Password:</b></label>
      <input
        type="password"
        placeholder="New password"
        id="pass"
        @input="editedProfile.password = $event.target.value"
        autocomplete="off"
        required
      >
      <button class="submit-btn" :class="{disabled: !isChanged}" @click="editAction">Login</button>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Settings',
  components: {
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'profile'
    ]),
    isChanged () {
      return this.profile.username !== this.editedProfile.username && this.profile.email !== this.editedProfile.email || this.editedProfile.password.length !== 0
    }
  },
  data () {
    return {
      editedProfile: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    editAction () {
      console.log(this.editedProfile)
    }
  },
  created () {
    this.editedProfile.email = this.profile.email
    this.editedProfile.username = this.profile.username
    console.log(this.editedProfile)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.avatar {
  width: 20%;
  margin-bottom: 30px;
  object-fit: cover;
  border-radius: 50%;
}
.content {
  display: flex;
  flex-direction: column;
  width: 40%;
}
.settings {
  font: $font-regular-bold;
  color: $forest;
  padding-top: 90px;
  width: 100%;
  display: flex;
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
  color: $forest;
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
.disabled {
  cursor: auto;
  pointer-events: none;
  opacity: 0.7;
  transition: $transition;
}
</style>
