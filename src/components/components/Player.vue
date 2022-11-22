<template>
  <transition name="slide">
    <div class="player">
      <div class="controls">
        <svg class="previous" @click="changePreviousSong">
          <use href="#previous"></use>
        </svg>
        <svg class="play-pause" @click="playPause">
          <use :href="playingState === 0 ? '#play' : '#pause'"></use>
        </svg>
        <svg class="next" @click="changeNextSong">
          <use href="#next"></use>
        </svg>
        <svg class="stop" @click="stopSong">
          <use href="#stop"></use>
        </svg>
      </div>
      <div class="middle-container">
        <div class="info-actions">
          <div class="info">{{getCurrentSong.artist}} - {{getCurrentSong.title}}</div>
          <div class="actions">
            <svg class="heart"
            :class="{active: isInFavorites}"
            @click="addRemoveFavSong">
              <use href="#heart"></use>
            </svg>
            <svg class="add-icon" @click="addToPlaylist">
              <use href="#add"></use>
            </svg>
          </div>
        </div>
        <div class="progress-container">
          <div class="time">{{currentStamp}}</div>
          <div class="progress-bar" id="progress" @click="seek">
            <div :style="{ width: percentComplete + '%' }" class="progress-bar-thumb"></div>
          </div>
          <div class="time">{{durationSong}}</div>
        </div>
      </div>
      <div class="volume-container">
        <svg class="volume-icon" @click="switchVolume">
          <use :href="audioState === 0 ? '#volumeoff' : '#volumeon'"></use>
        </svg>
        <div class="volume-bar">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            v-model.number="currentVolume"
            class="slider"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  data() {
    return {
      currentVolume: 1,
      previousVolume: 0.35,
      audio: null,
      currentSeconds: 0,
      playingState: 0,
      audioState: 1,
      durationSong: 0
    }
  },
  computed: {
    ...mapGetters(['getCurrentSong', 'favoriteSongs', 'playerSongs']),
    percentComplete() {
      return (this.currentSeconds / this.audio.duration) * 100
    },
    currentS(){
      const currS = Math.floor(this.currentSeconds)
      if(currS < 10) {
        return '0' + currS
      } else if (currS % 60 === 0) {
        return '00'
      } else {
        return currS
      }
    },
    currentM() {
      const currS = Math.floor(this.currentSeconds / 60)
      if(currS < 10) {
        return '0' + currS
      } else{
        return currS
      }
    },
    currentStamp() {
      return `${this.currentM}:${this.currentS}`
    },
    isInFavorites () {
      return !!this.favoriteSongs.find(id => id === this.getCurrentSong.songId)
    },
    getCurrentSongIndex () {
      return this.playerSongs.findIndex(songObj => this.getCurrentSong.songId === songObj.song.songId )
    }
  },
  watch: {
    currentVolume() {
      this.audio.volume = this.currentVolume
      if(this.audio.volume > 0){
        this.audioState = 1
      } else {
        this.audioState = 0
      }
    },
    getCurrentSong: {
      handler (to, from) {
        if (to !== from) {
          if (this.audio) {
            this.audio.src = null
          }
          this.initializeSong()
          this.playPause()
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'openAddPlaylistModal', 'addRemoveFavoriteSong', 'updateCurrentSong'
    ]),
    initializeSong(){
      this.audio = new Audio(this.getCurrentSong.url)
      this.audio.volume = this.currentVolume
      this.audio.addEventListener('loadedmetadata', this.generateDuration)
      this.audio.addEventListener('timeupdate', this.update)
      this.audio.addEventListener('ended', this.ended)
    },
    playPause() {
      if (this.audio.paused) {
        this.audio.play()
        this.playingState = 1
      } else {
        this.audio.pause()
        this.playingState = 0
      }
    },
    update() {
      this.currentSeconds = this.audio.currentTime
    },
    ended(){
      this.changeNextSong()
    },
    stopSong() {
      this.audio.removeEventListener('timeupdate', this.update)
      this.audio.removeEventListener('ended', this.ended)
      this.$store.dispatch('stopSong')
      this.audio.src =  null
    },
    switchVolume () {
      if (this.audioState === 1) {
        this.previousVolume = this.currentVolume
        this.currentVolume = 0
        this.audioState = 0
      } else {
        this.currentVolume = this.previousVolume
        this.audioState = 1
      }
    },
    seek (e) {
      const progressBar = document.querySelector('#progress')
      const outerCoordinates = progressBar.getBoundingClientRect()
      const seekedPercent = (this.audio.duration * (e.clientX - outerCoordinates.left)) / outerCoordinates.width
      this.currentSeconds = seekedPercent
      this.audio.currentTime = seekedPercent
    },
    restart () {
      this.audio.currentTime = 0
      if (this.audio.paused) {
        this.audio.play()
        this.playingState = 1
      }
    },
    generateDuration () {
      const duration = this.audio.duration
      let durationMinutes = Math.floor(duration / 60)
      let durationSeconds = Math.floor(duration)

      if (durationMinutes < 10) {
        durationMinutes = '0' + durationMinutes
      }
      if (durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds
      } else if (durationSeconds % 60 === 0) {
        durationSeconds = '00'
      }

      this.durationSong = `${durationMinutes}:${durationSeconds}`
    },
    addToPlaylist () {
      this.openAddPlaylistModal({
        songId: this.getCurrentSong.songId
      })
    },
    async addRemoveFavSong () {
      try {
        await this.addRemoveFavoriteSong({favId: this.getCurrentSong.songId, value: !this.isInFavorites})
      } catch (e) {
        console.log(e)
      }
    },
    changeNextSong () {
      const indexOfNext = this.getCurrentSongIndex + 1
      const nextSong = this.playerSongs[indexOfNext] || this.playerSongs[0]
      this.updateCurrentSong({song: nextSong.song, artist: nextSong.artist})
    },
    changePreviousSong () {
      const indexOfNext = this.getCurrentSongIndex - 1 
      const nextSong = this.playerSongs[indexOfNext] || this.playerSongs[this.playerSongs.length - 1]
      this.updateCurrentSong({song: nextSong.song, artist: nextSong.artist})
    }

  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.slide-enter-active, .slide-leave-active {
  transition: transform $transition;
}

.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-to, .slide-leave {
  transform: translateY(0);
}

.player {
  z-index: 11111;
  height: 130px;
  width: 100vw;
  min-width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: $input-background;
  border-top: 2px solid $color-dull;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  svg {
    width: 30px;
    height: 30px;
    fill: $color-normal;
    cursor: pointer;

    &:hover {
      transition: $transition;
      fill: $color-accent;
    }
  }
  .stop {
    width: 20px;
    height: 20px;
  }
}

.middle-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 500px;
  .info-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45vw;
    min-width: 350px;
    margin-bottom: 15px;
    .info {
      font: var(--font-medium-bold);
      color: $font-normal;
    }
    .actions {
      display: flex;
      gap: 15px;
      svg {
        width: 24px;
        height: 24px;
        fill: $color-normal;
        cursor: pointer;
        &:hover {
          transition: $transition;
          fill: $color-accent;
        }
      }
      .heart {
        &.active {
          fill: $favorite;
          &:hover {
            transition: $transition;
            fill: $favorite-hover;
          }
        }
        &:hover {
          transition: $transition;
          fill: $color-normal;
        }
      }
    }
  }
  .progress-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .time {
      font: var(--font-regular);
      color: $font-normal;
    }
    .progress-bar {
      position: relative;
      display: flex;
      align-items: center;
      width: 45vw;
      min-width: 350px;
      height: 7px;
      margin-left: 10px;
      margin-right: 10px;
      background-color: $color-dull;
      border-radius: 5px;
      cursor: pointer;

      .progress-bar-thumb {
        position: absolute;
        height: 100%;
        background-color: $color-accent;
        left: 0;
        border-radius: 5px;
      }
    }
  }
}
.volume-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    .volume-icon {
      width: 35px;
      height: 35px;
      fill: $color-normal;
    }

    .volume-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;

      .slider {
        -webkit-appearance: none;
        width: 80%;
        height: 7px;
        border-radius: 5px;
        background-color: $color-dull;
        outline: none;
        cursor: pointer;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: $color-accent;
        }
      }
    }
  }
  @media (min-width: 2000px) {
  .controls {
    svg {
      width: 50px;
      height: 50px;
    }
    .stop {
      width: 30px;
      height: 30px;
    }
  }
  .volume-container {
    width: 280px;
    .volume-icon {
      width: 45px;
      height: 45px;
    }
  }
  .middle-container {
    .info-actions {
      .actions {
        svg {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}
</style>
