<template>

<v-carousel height="600">
  <v-carousel-item>
    <div className="cardContainer">
      <RecommendedCard :showData="props.recommended[0]"/>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <div className="cardContainer">
      <RecommendedCard :showData="props.recommended[1]"/>
    </div>
  </v-carousel-item>

  <v-carousel-item>
    <div className="cardContainer">
      <RecommendedCard :showData="props.recommended[2]"/>
    </div>
  </v-carousel-item>

</v-carousel>
  </template>

<script setup>
 import RecommendedCard from './RecommendedCard.vue'

 const props = defineProps(['recommended'])

</script>

<style scoped>
.cardContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
}
</style>