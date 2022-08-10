<template>
  <div class="song">
    <div class="image">
      <img :alt="item.title" class="image" :src="item.image" @click="goToAlbum"/>
    </div>
    <div class="info">
      <span class="artist" @click="goToArtist">{{item.artist.name}}</span> - <span class="album" @click.self="goToAlbum">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumsResults',
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
    goToAlbum () {
      this.$router.push({name: 'Album', params: { id: this.item.id } })
    },
    goToArtist () {
      this.$router.push({name: 'Artist', params: { id: this.item.artistId } })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.song {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
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
.album, .artist {
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
