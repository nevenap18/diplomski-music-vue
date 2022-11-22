<template>
  <div>
    <div class="card" @click="$router.push('/' + type + '/' + item.id)">
      <img :alt="item.title" class="image" :src="item.image" />
      <div class="card-title">
          <div class="title">{{ item.title || item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
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

.card{
  // box-shadow: 0 0 8px 6px rgba(0,0,0,0.1);

  @keyframes fadeIn {
    0% {
    opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: $transition;
    .title {
      color: $font-normal;
      transition: $transition;
    }
  }
}
.image {
  box-shadow: 0 0 8px 6px rgba(0,0,0,0.08);
  background-size: cover;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border-radius: $radius;
}
.title {
  font: var(--font-regular-bold);
  color: $font-normal;
}
</style>
