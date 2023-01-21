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
    <form class="form" @submit.prevent>
      <Input
            class="input"
            label="Title:"
            placeholder="Title"
            id="title"
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
            @change="desc = $event"
            @focus="resetError"
            autocomplete="off"
          />
          <Button v-loader="loading" type="submit" styleType="accent" label="Create" :disabled="!this.title" @click.native="createPlaylist"/>
          <p v-if="error" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import {mapActions,} from 'vuex'
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
      errorMessage: '',
      loading: false
    }
  },
  components: {
    Input,
    Button
  },
  methods: {
    ...mapActions([
      'closeCreatePlaylistModal', 'getPlaylists'
    ]),
    createPlaylist () {
      this.loading = true
      const playlist = new PlaylistRepo()
      playlist.createPlaylist({title: this.title, description: this.desc}).then(() => {
        setTimeout(() => {
          this.getPlaylists()
          this.closeCreatePlaylistModal()
          this.loading = false
        }, 1000)
      }).catch(e => {
        this.error = true
        this.errorMessage = e.response.data.message[0]
        this.loading = false
      })
    },
    resetError () {
      this.error = false
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
  font: var(--font-medium-bold);
  color: $font-normal;
}
.form {
  width: 90%;
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
  &:hover {
    fill: $color-accent;
    transition: $transition;
  }
}
.error {
  color: $error;
  &:first-letter {
    text-transform: uppercase;
  }
}
@media (min-width: 2000px) {
  .create-modal {
    padding: 30px;
    width: 30vw;
    max-width: 700px;
    min-width: 500px;
  }
  .input {
    margin-top: 44px;
  }
  .close-svg {
    width: 40px;
    height: 40px;
  }
}
</style>
