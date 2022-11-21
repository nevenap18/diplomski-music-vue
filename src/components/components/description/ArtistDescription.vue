<template>
  <div class="description-container">
    <img class="image" :alt="artist.name" :src="artist.image"/>
    <div class="info-container">
      <div v-if="artist.name" class="title-container">
        <span class="title">{{ artist.name }}</span>
      </div>
      <div v-if="artist.description" class="description">{{ artist.description }}</div>
      <div v-else class="description">No description.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistDescription',
  props: {
    artist: {
      type: Object,
      required: true
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
  border-radius: 50%;
}
.info-container {
  width: 100%;
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  justify-content: center;
  .title-container {
    font: $font-xxlarge-bold;
    display: flex;
    align-items: center;
  }
  .title {
    color: $color-normal;
  }
  .description {
    font: $font-regular;
    color: $color-normal;
    margin-top: 15px;
  }
}
svg {
  margin-left: 10px;
  width: 22px;
  height: 22px;
  fill: $color-dull;
  cursor: pointer;
  &:hover {
    transition: $transition;
    fill: $color-dull-hover;
  }
}
.delete-svg:hover {
  transition: $transition;
  fill: $maroon;
}
</style>
