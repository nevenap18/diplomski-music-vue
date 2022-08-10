<template>
  <div class="song">
    <div class="info-container">
      <div class="image">
        <img :alt="item.title" class="image" :src="item.imageUrl"/>
      </div>
      <div class="info">
        <span><span class="artist" @click="goToArtist">{{item.artist.name}}</span> - {{item.title}}</span>
      </div>
    </div>
    <div class="actions">
      <svg class="play-svg">
        <use href="#play"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongsResults',
  components: {
    // Card
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToArtist () {
      this.$router.push({name: 'Artist', props: {id: this.item.artist.artistId}})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.song {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: $font-medium;
  color: $forest;
  border-bottom: 1px solid $moss;
}
.image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.artist {
  cursor: pointer;
  &:hover {
    color: $moss;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
  width: 17px;
  height: 17px;
  fill: $moss;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    fill: $forest;
  }
}
</style>
