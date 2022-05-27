<template>
<transition name="slide">
  <div class="player" v-if="getCurrentSong">
    <div class="controls">
      <div class="playStopButton">
        <!-- <img :src="playingState === 0 ? require('@/assets/play.png') : require('@/assets/pause.png')" @click="playPause"> -->
      </div>
      <div class="playStopButton">
        <!-- <img :src="require('@/assets/stop.png')" @click="stopSong" /> -->
      </div>
      <div class="volume">
        <div class="volumIcon">
          <!-- <img :src="audioState === 0 ? require('@/assets/volumeoff.png') : require('@/assets/volumemax.png')" @click="switchVolume" /> -->
        </div>
        <div class="volumeBar">
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
    <div v-if="getCurrentSong" class="info">{{getCurrentSong.artist.name}} - {{getCurrentSong.title}}</div>
      
    <div class="progress-bar-holder">
      <div class="time">{{currentStamp}}</div>
      <div class="progress-bar" id="progress" @click="seek">
        <div :style="{ width: percentComplete + '%' }" class="progress-bar-thumb"></div>
      </div>
    <div class="time">{{durationSong}}</div>
    </div>
  </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Player",
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
    ...mapGetters(["getCurrentSong"]),
    percentComplete() {
      return (this.currentSeconds / this.audio.duration) * 100
    },
    currentS(){
      let currS = Math.floor(this.currentSeconds)
      if(currS < 10) {
        return '0' + currS
      } else{
        return currS
      }
    },
    currentM() {
      let currS = Math.floor(this.currentSeconds/60)
      if(currS < 10) {
        return '0' + currS
      } else{
        return currS
      }
    },
    currentStamp() {
      return this.currentM + ':' + this.currentS
    }
  },
  watch: {
    getCurrentSong(to, from) {
      if (to !== from) {
        if (this.audio) this.audio.src = null
        this.initializeSong()
        this.playPause()
      }
    },
    currentVolume() {
      this.audio.volume = this.currentVolume
      if(this.audio.volume > 0){
        this.audioState = 1
      } else {
        this.audioState = 0
      }
    }
  },
  methods: {
    initializeSong(){
      this.audio = new Audio(this.getCurrentSong.preview)
      this.audio.volume = this.currentVolume
      this.audio.addEventListener("loadedmetadata", this.generateDuration)
      this.audio.addEventListener("timeupdate", this.update)
      this.audio.addEventListener("ended", this.ended) 
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
      this.playingState = 0
    },
    stopSong() {
      this.audio.removeEventListener("timeupdate", this.update)
      this.audio.removeEventListener("ended", this.ended)
      this.$store.dispatch("stopSong")
      this.audio.src =  null
      
    },
    switchVolume() {
      if (this.audioState === 1) {
        this.previousVolume = this.currentVolume
        this.currentVolume = 0
        this.audioState = 0
        return
      } else {
        this.currentVolume = this.previousVolume
        this.audioState = 1
      }
    },
    seek(e) {
      let progressBar = document.querySelector("#progress")
      let outerCoordinates = progressBar.getBoundingClientRect()
      let seekedPercent = (this.audio.duration * (e.clientX - outerCoordinates.left)) / outerCoordinates.width
      this.currentSeconds = seekedPercent
      this.audio.currentTime = seekedPercent
    },
    generateDuration() {
      let durationMinutes = Math.floor(this.audio.duration/60)
      let durationSeconds = Math.floor(this.audio.duration)

      if(durationMinutes < 10) {
        durationMinutes = '0' + durationMinutes
      }
      if(durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds
      }
      this.durationSong = durationMinutes + ':' + durationSeconds
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.slide-enter-active, .slide-leave-active {
  transition: transform 0.6s;
}

.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-to, .slide-leave {
  transform: translateY(0);
}

.player {
  height: 100px;
  width: 100vw;
  min-width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: blue;
  border-top: 1px solid blue;
  display: flex;
  align-items: center;

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 300px;
    img {
      cursor: pointer;
      width: 20px;
    }
    .playStopButton {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 100%;

      &:active {
        background-color: blue;
        transition: 0.1s;
      }
    }
    .volume {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100px;;

      &:active {
        background-color: blue;
        transition: 0.1s;
      }
      .volumeBar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70%;

        .slider {
          -webkit-appearance: none;
          width: 70%;
          height: 7px;
          border-radius: 5px;
          background: blue;
          outline: none;
          cursor: pointer;

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
          }
        }
      }
    }
  }
  .info {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 200px;
    min-width: 150px;
    font-size: 15px;
  }
  .progress-bar-holder {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 30vw;

    .progress-bar {
      position: relative;
      display: flex;
      align-items: center;
      width: 80%;
      height: 7px;
      margin-left: 10px;
      margin-right: 10px;
      background-color: blue;
      border-radius: 5px;
      cursor: pointer;

      .progress-bar-thumb {
        position: absolute;
        height: 100%;
        background-color: white;
        left: 0;
        border-radius: 5px;
      }
    }
  }
}
// @media screen and (max-width: $break-small) {
//   .volume {
//     display: none !important;
//   }
//   .player {
//     flex-direction: column;
//     justify-content: space-around;
//     width: 100%;
//     height: 140px;
//     padding: 0;
//     position:fixed;
//     bottom:0;
//     left: 0;
//     right: 0;
//     .controls {
//       margin: 10px;
//       font-size: 10px;
//       width: calc(100vw / 1.1);
//       justify-content: center;
//         img {
//           width: 20px;
//         }
//     }
//     .info {
//       font-size: 15px;
//       justify-content: center;
//     }
//     .progress-bar-holder {
//       width: 100vw;
//       //margin: 15px;
//       justify-content: space-around;
//       align-items: center;
//       padding: 10px;
//       .progress-bar {
//         width: 60%;
//         margin: 0;
//       }
//       .time {
//         height: 15px;
//         margin: 5px;
//       }
//     }
    
//   }
  
// }
</style>