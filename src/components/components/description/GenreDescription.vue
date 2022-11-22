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
  max-height: 300px;
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  justify-content: center;
  .title-container {
    font: var(--font-xxlarge-bold);
  }
  .title {
    color: $color-normal;
  }
  .description {
    font: var(--font-regular);
    color: $color-normal;
    margin-top: 15px;
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
