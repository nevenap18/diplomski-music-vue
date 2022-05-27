<template>
  <div class="row">
    <div class="title" @click="$router.push({path: '/' + type})">
      <h1>{{ type.toUpperCase() }}</h1>
    </div>
    <div class="collection">
      {{items.lenght}}
      <div v-for="(item, index) in items" :key="index">
        <Card class="card-item" :item="item" :type="type" :index="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'CardRow',
  components: {
    Card
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.content {
}
.title {
  margin: 30px 0;
  color: $forest;
  font: $font-regular-bold;
  display: inline-block;
  &:hover {
    color: $moss;
    cursor: pointer;
  }
}
.collection {
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 25px;
  grid-template-columns: repeat(6, 1fr);
  margin: 20px auto;
  max-width: 100%;
}

</style>
