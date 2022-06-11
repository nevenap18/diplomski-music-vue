<template>
  <div class="create-modal">
    <div class="container-top">
      <svg
        class="close-svg"
        @click="closeCreatePlaylistModal"
      >
        <use href="#close"></use>
      </svg>
      <div class="modal-name"> CREATE PLAYLIST </div>
    </div>
    <form @submit.prevent>
      <div class="playlists">
        <label for="title"><b>Title</b></label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          :value="title"
          @input="title = $event.target.value"
          @focus="resetError"
          autocomplete="off"
          required
          >
        <label for="desc"><b>Description</b></label>
        <input
          type="text"
          placeholder="Description"
          name="desc"
          id="desc"
          :value="desc"
          @input="desc = $event.target.value"
          @focus="resetError"
          autocomplete="off"
          required
        >
      </div>
    </form>
    <div class="create">
      <button class="button-create" type="submit" @click="createPlaylist">Create</button>
      <p v-if="error" class="error">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PlaylistRepo from '@/helpers/repo/Playlist.js'
export default {
  name: 'CreatePlaylistModal',
  data () {
    return {
      title: '',
      desc: '',
      error: false,
      errorMessage: ''
    }
  },
  components: {
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'closeCreatePlaylistModal', 'getPlaylists'
    ]),
    createPlaylist () {
      const playlist = new PlaylistRepo()
      playlist.createPlaylist({title: this.title, description: this.desc}).then(() => {
        this.getPlaylists()
        this.closeCreatePlaylistModal()
      }).catch(e => {
        this.error = true
        this.errorMessage = e.response.data.message[0]
      })
    },
    resetError () {
      this.errorLogin = false
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.create-modal {
  padding: 20px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: $moss;
  width: 40vw;
  height: 60vh;
  max-height: 800px;
  max-width: 500px;
  min-height: 400px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.playlists {
  max-height: 500px;
  width: 100%;
  overflow-y: auto;
  color: $cream;
}
.container-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg {
  align-self: center;
}
svg {
  width: 17px;
  height: 17px;
  fill: $cream;
  margin-left: 10px;
  cursor: pointer;
}
button {
  display: inline-block;
  padding: 10px 30px;
  margin-right: 15px;
  background: transparent;
  border: transparent;
  border-radius: 4px;
  background: $forest;
  font: $font-regular;
  color: $cream;
  cursor: pointer;
}
input[type=text] {
  outline: none;
  background: transparent;
  border-width: 0 0 2px;
  border-color: $cream;
  transition: $transition;
  width: 100%;
  padding: 5px 5px;
  margin: 15px 0 40px 0;
  display: inline-block;
  box-sizing: border-box;
  font: $font-regular;
  color: $cream;
}
input:focus {
  border-color: $cream;
}
input:-webkit-autofill { 
  -webkit-background-clip: text;
  background-clip: text;
}
.error {
  color: $error;
}
</style>
