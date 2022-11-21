<template>
  <div class="description-container">
    <img class="image" :alt="genre.title" :src="genre.image"/>
    <div class="info-container">
      <div v-if="genre.title" class="title-container">
        <span class="title">{{ genre.title }}</span>
      </div>
      <div v-if="genre.description" class="description">{{ genre.description }}</div>
      <div v-else class="description">No description.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenreDescription',
  props: {
    genre: {
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
  border-radius: $radius;
}
.info-container {
  width: 100%;
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  justify-content: center;
  .title-container {
    font: $font-xxlarge-bold;
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
</style>
