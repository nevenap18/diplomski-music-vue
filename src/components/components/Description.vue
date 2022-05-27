<template>
  <div class="description-container">
    <div class="image-container">
      <img class="image" :alt="'aaa'" :src="image"/>
    </div>
    <div class="info-container">
      <div v-if="title" class="title"> {{ title }}
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
      </div>
      <div v-if="year" class="year">{{ year }}</div>
      <div v-if="description" class="description">{{ description }}</div>
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
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.description-container {
  display: flex;
  padding: 30px;
  background: linear-gradient($gold, $cream);
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
.fav-svg {
  width: 20px;
  height: 20px;
  fill: $moss;
  cursor: pointer;
  &.active {
    fill: red;
  }
}
</style>
