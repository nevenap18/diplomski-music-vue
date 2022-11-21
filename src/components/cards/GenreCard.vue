<template>
  <div>
    <div class="card" @click="$router.push('/' + type + '/' + item.id)">
      <img :alt="item.title" class="image" :src="item.image" />
      <div class="card-title">
          <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GenreCard',
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number
      },
      type: {
        type: String,
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
  font: $font-medium-bold;
  color: $font-normal;
}
</style>
