<template>
  <div>
    <div class="card" @click="$router.push('/artists/' + item.id)">
      <img :alt="item.title" class="image" :src="item.image" />
      <div class="card-title">
          <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArtistCard',
    props: {
      item: {
        type: Object,
        required: true
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
    .name {
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
  border-radius: 50%;
}
.name {
  font: $font-medium-bold;
  color: $font-normal;
  text-align: center;
}
</style>
