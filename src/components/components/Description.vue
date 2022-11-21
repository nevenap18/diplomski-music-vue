<template>
  <div class="description-container">
    <div class="image-container">
      <img class="image" :alt="'aaa'" :src="image"/>
    </div>
    <div class="info-container">
      <div v-if="title" class="title">{{ title }}
        <span
          class="artist"
          v-if="artist && artist.name"
          @click="$router.push('/artists/' + artist.id)"
        >
        ({{artist.name}})
        </span>
        <span v-if="showFavButton" class="fav-button">
          <svg
            :class="{active: isAlbumInFavorites}"
            class="fav-svg"
            @click="$emit('changeFav')"
          >
            <use href="#heart"></use>
          </svg>
        </span>
        <span v-if="isPlaylist" class="edit-button">
          <svg
            class="edit-svg"
            @click="$emit('edit')"
          >
            <use href="#edit"></use>
          </svg>
        </span>
        <span v-if="isPlaylist" class="delete-button">
          <svg
            class="delete-svg"
            @click="$emit('delete')"
          >
            <use href="#delete"></use>
          </svg>
        </span>
      </div>
      <div v-if="year" class="year">{{ year }}</div>
      <div v-if="description" class="description">{{ description }}</div>
      <div v-else class="description">No description.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    year: {
      type: [String, Number],
      required: false
    },
    artist: {
      type: Object,
      required: false
    },
    showFavButton: {
      type: Boolean,
      required: false,
      default: false
    },
    isAlbumInFavorites: {
      type: Boolean,
      required: false,
      default: false
    },
    isPlaylist: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.description-container {
  display: flex;
  padding: 30px;
  background: linear-gradient($background, $background-alternate);
}
img {
  max-width: 300px;
}
.artist {
  cursor: pointer;
}
.info-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  .title {
    font: $font-xxlarge-bold;
    margin-bottom: 10px;
  }
  .year {
    font: $font-regular-bold;
    margin-bottom: 10px;
  }
  .description {
    font: $font-regular;
    margin-bottom: 10px;
    text-align: center;
  }
}
svg {
  margin: 0 5px 0 5px;
  width: 20px;
  height: 20px;
  fill: $moss;
  cursor: pointer;
  &:hover {
    fill: $forest;
  }
}
.fav-svg.active {
  fill: $favorite;
}
.delete-svg:hover {
  transition: fill $transition;
  fill: $maroon !important;
}
</style>
