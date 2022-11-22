<template>
  <div class="description-container">
    <img class="image" :alt="album.title" :src="album.image"/>
    <div class="info-container">
      <div v-if="album.title" class="title-container">
        <span class="title">{{ album.title }}</span>
        <span class="fav-button">
          <svg
            :class="{active: isAlbumInFavorites}"
            class="fav-svg"
            @click="$emit('changeFav')"
          >
            <use href="#heart"></use>
          </svg>
        </span>
      </div>
      <div class="artist" v-if="album.artist && album.artist.name">
       by <span class="artist-link" @click="$router.push('/artists/' + artist.id)">{{album.artist.name}}</span>
      </div>
      <div v-if="album.year" class="year">{{ album.year }}</div>
      <div v-if="album.description" class="description">{{ album.description }}</div>
      <div v-else class="description">No description.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    album: {
      type: Object,
      required: true
    },
    isAlbumInFavorites: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.description-container {
  display: flex;
  background: $background;
}
.image {
  max-width: 300px;
  border-radius: $radius;
}
.info-container {
  width: 100%;
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  justify-content: center;
  max-height: 300px;
  .title-container {
    font: var(--font-xxlarge-bold);
  }
  .title {
    color: $color-normal;
  }
  .artist {
    margin-bottom: 15px;
    font: var(--font-medium-bold);
    color: $color-dull;
    .artist-link {
      cursor: pointer;
      &:hover {
        color: $color-dull-hover;
      }
    }
  }
  .year {
    font: var(--font-regular-bold);
    color: $color-dull;
    margin-bottom: 10px;
  }
  .description {
    font: var(--font-regular);
    color: $color-normal;
    margin-top: 10px;
    padding-right: 10px;
    overflow-y: auto;
  }
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: $background-alternate;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $color-normal;
    border-radius: 4px;
  }
}
svg {
  margin-left: 10px;
  width: 22px;
  height: 22px;
  fill: $color-normal;
  cursor: pointer;
  &:hover {
    transition: $transition;
    fill: $color-normal;
  }
}
.fav-svg.active {
  fill: $favorite;
  &:hover {
    transition: $transition;
    fill: $favorite-hover;
  }
}
@media (min-width: 2000px) {
  svg {
    margin-left: 15px;
    width: 30px;
    height: 30px;
  }
}
</style>
