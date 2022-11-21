<template>
  <div class="description-container">
    <div class="gradient" :style="{ background: getGradient()}">
      <img class="image" :alt="playlist.title" :src="playlist.image"/>
    </div>
    <div class="info-container">
      <div v-if="playlist.title" class="title-container">
        <span class="title">{{ playlist.title }}</span>
        <span class="edit-button">
          <svg
            class="edit-svg"
            @click="$emit('edit')"
          >
            <use href="#edit"></use>
          </svg>
        </span>
        <span class="delete-button">
          <svg
            class="delete-svg"
            @click="$emit('delete')"
          >
            <use href="#delete"></use>
          </svg>
        </span>
      </div>
      <div v-if="playlist.description" class="description">{{ playlist.description }}</div>
      <div v-else class="description">No description.</div>
    </div>
  </div>
</template>

<script>
import { generateGradient } from '@/helpers/gradient.js'

export default {
  name: 'PlaylistDescription',
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  methods: {
    getGradient () {
      return generateGradient()
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
  visibility: hidden;
}
.gradient {
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
