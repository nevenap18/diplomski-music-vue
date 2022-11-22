<template>
  <div>
    <div class="card" @click="$router.push('/albums/' + item.id)">
      <img :alt="item.title" class="image" :src="item.image" />
      <div class="card-title">
          <div v-if="item.title" class="title">{{ item.title }}</div>
          <div v-if="item.artist" class="artist">by {{ item.artist.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AlbumCard',
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.card {
  &:hover {
    cursor: pointer;
    transition: $transition;

    .image {
      transform: scale(1.03);
      transition: $transition;
    }
    .title {
      color: $font-accent;
      transition: $transition;
    }
  }
}
.image {
  background-size: cover;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border-radius: $radius;
}
.title {
  font: var(--font-medium-bold);
  color: $font-normal;
}
.artist {
  font: var(--font-regular-bold);
  color: $font-dull;
}
</style>
