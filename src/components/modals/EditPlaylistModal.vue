
<template>
  <div class="container" @click.self="closeEditPlaylistModal">
    <div class="edit-modal">
      <div class="container-top">
        <svg
          class="close-svg"
          @click="closeEditPlaylistModal"
        >
          <use href="#close"></use>
        </svg>
        <div class="modal-name"> EDIT PLAYLIST </div>
      </div>
      <form class="form" @submit.prevent>
        <Input
          class="input"
          label="Title:"
          placeholder="Title"
          id="title"
          :value="title"
          @change="title = $event"
          @focus="resetError"
          autocomplete="off"
        />
        <Input
          class="input"
          type="text"
          label="Description:"
          placeholder="Description"
          id="description"
          :value="desc"
          @change="desc = $event"
          @focus="resetError"
          autocomplete="off"
        />
        <Button type="submit" styleType="accent" label="Save" :disabled="!this.title" @click.native="editPlaylist"/>
        <p v-if="error" class="error">{{errorMessage}}</p>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PlaylistRepo from '@/helpers/repo/Playlist.js'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
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
    Input,
    Button
  },
  computed: {
    ...mapGetters([
      'editPlaylistModalData'
    ])
  },
  methods: {
    ...mapActions([
      'closeEditPlaylistModal', 'getPlaylists'
    ]),
    editPlaylist () {
      const playlist = new PlaylistRepo()
      playlist.editPlaylist({playlistId: this.editPlaylistModalData.playlistId, title: this.title, description: this.desc}).then(() => {
        window.location.reload()
        this.closeEditPlaylistModal()
      }).catch(e => {
        this.error = true
        this.errorMessage = e.response.data.message[0]
      })
    },
    resetError () {
      this.error = false
      this.errorMessage = ''
    }
  },
  created () {
    this.title = this.editPlaylistModalData.title
    this.desc = this.editPlaylistModalData.description
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: black, $alpha: 0.6);
  z-index: 522;
}
.edit-modal {
  padding: 20px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: $background-alternate;
  width: 30vw;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: $radius;
}
.container-top {
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  position: relative;
  font: $font-medium-bold;
  color: $font-normal;
}
.form {
  width: 80%;
  margin: 50px 0;
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

.close-svg {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 35px;
  height: 35px;
  fill: $color-normal;
  margin-left: 10px;
  cursor: pointer;
}
.error {
  color: $error;
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
