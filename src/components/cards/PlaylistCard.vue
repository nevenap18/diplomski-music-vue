<template>
  <div>
    <div class="card" @click="goToPlaylist">
      <div :style="{ background: getGradient()}" class="gradient">
        <img :alt="item.title" class="image" :src="item.image" />
      </div>
      <div v-if="item.title" class="title">{{ item.title }}</div>
      <div v-if="songCount" class="count">{{ songCount }} {{countText}}</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { generateGradient } from '@/helpers/gradient.js'

export default {
  name: 'PlaylistCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    songCount () {
      if (!Object.keys(this.item).includes('songs')) {
        return undefined
      }
      if (this.item.songs && this.item.songs.length) {
        return this.item.songs.length
      } else {
        return '0'
      }
    },
    countText () {
      if (this.songCount === 1) {
        return 'song'
      } else {
        return 'songs'
      }
    }
  },
  methods: {
    ...mapActions([
      'openCreatePlaylistModal'
    ]),
    getGradient() {
      return generateGradient()
    },
    goToPlaylist () {
      this.$router.push('/playlists/' + this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card {
  position: relative;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: $transition;
  }
}
.image {
  width: 100%;
  height: 100%;
  border-radius: $radius;
  visibility: hidden;
}
.gradient {
  width: 100%;
  height: 100%;
  border-radius: $radius;
}
.title {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  font: var(--font-medium-bold);
  color: $font-normal;
  text-shadow: 1px 1px $font-dull;
}
.count {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font: var(--font-medium);
  color: $font-normal;
  text-shadow: 1px 1px $font-dull;
}

</style>
