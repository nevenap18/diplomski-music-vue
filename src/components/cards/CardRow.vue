<template>
  <div class="row">
    <div v-if="!hideTitle" class="title" :class="{'hover-title': !disableTitleNavigation}" @click="goTo">
      <h1>{{ type.toUpperCase() }}</h1>
    </div>
    <div class="collection">
      <slot name="action-card">
      </slot>
      <div v-for="(item, index) in items" :key="index">
        <component
          class="card-item"
          :index="index"
          :is="getComponent()"
          :type="type"
          :item="item"
        />
      </div>
    </div>
    <span v-if="!items.length" class="message">Sorry, nothing to show.</span>
  </div>
</template>

<script>
import AlbumCard from './AlbumCard.vue'
import GenreCard from './GenreCard.vue'
import ArtistCard from './ArtistCard.vue'
import PlaylistCard from './PlaylistCard.vue'

export default {
  name: 'CardRow',
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    disableTitleNavigation: {
      type: Boolean,
      required: false,
      default: false
    },
    hideTitle: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getComponent () {
      if (this.type === 'albums') {
        return AlbumCard
      }
      if (this.type === 'artists') {
        return ArtistCard
      }
      if (this.type === 'genres') {
        return GenreCard
      }
      if (this.type === 'playlists') {
        return PlaylistCard
      }
      if (this.type === 'favorite albums') {
        return AlbumCard
      }
    },
    goTo () {
      const path = '/' + this.type
      if (this.$route.path !== path && !this.disableTitleNavigation) {
          this.$router.push({path})
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.title {
  margin-bottom: 15px;
  margin-top: 35px;
  color: $font-normal;
  font: var(--font-regular-bold);
  display: inline-block;
}
.hover-title {
  &:hover {
    transition: $transition;
    color: $font-accent;
    cursor: pointer;
  }
}
.collection {
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 30px;
  grid-template-columns: repeat(5, 1fr);
  margin: 30px auto;
  max-width: 100%;
}
.message {
  color: $color-dull;
  font: var(--font-regular-bold);
}
</style>
