<template>
  <div>
    <div class="card" @click="openCreatePlaylistModal">
      <div class="container">
        <img alt="create playlist" class="image" :src="item.image" />
      </div>
      <div class="create-btn">
        <svg class="add-svg">
          <use href="#add"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    name: 'CreatePlaylistCard',
    data () {
      return {
        item: {
          image: 'https://i.ibb.co/3h2H3Wk/image.jpg'
        }
      }
    },
    methods: {
      ...mapActions([
        'openCreatePlaylistModal'
      ])
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card {
  position: relative;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: $transition;
    .add-svg {
      transition: $transition;
      fill: $color-accent;
      cursor: pointer;
    }
  }
}
.image {
  width: 100%;
  height: 100%;
  border-radius: $radius;
  visibility: hidden;
}
.container {
  background: $input-background;
  border-radius: $radius;
}
.create-btn {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  text-shadow: 1px 1px $font-dull;
}
.add-svg {
  width: 40px;
  height: 40px;
  fill: $color-dull;
  cursor: pointer;
}
@media (min-width: 2000px) {
  .add-svg {
    width: 45px;
    height: 45px;
  }
}
@media (max-width: 1024px) {
  .add-svg {
    width: 30px;
    height: 30px;
  }
}
</style>
