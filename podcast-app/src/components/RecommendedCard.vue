<template>
  <v-card
      width="400"
      height="500"
      @click="showClickHandler"
      @enter="showPlayButtonToggle"
      @mouseleave="showPlayButtonToggle"
    >   
      <v-card-title>{{ props.showData.title }}</v-card-title>
      <v-chip>{{ props.showData.seasons }} SEASONS</v-chip>
      <v-img
      :src="props.showData.image"
      width="100%"
      cover
      >
        <router-link to="/show">
            <v-btn 
            v-show="showPlayButton"
            class="playButton" 
            density="default" 
            icon="mdi-play" 
            size="x-large"
            ></v-btn>
        </router-link>
      </v-img>
      
  </v-card>
</template>
    
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const props = defineProps(['showData'])

let showPlayButton = ref(false)

const showPlayButtonToggle = () => {
  showPlayButton.value = !showPlayButton.value
}

const { currentShowId } = storeToRefs(useAppStore())

const showClickHandler = () => {
  currentShowId.value = props.showData.id
}

</script>

<style scoped>
.v-card {
    text-align: center;
}
.v-chip {
    margin-bottom: 0.5rem;
}
.playButton{
 position: relative;
 top: 5%;
 right: 35%;
 z-index: 10;
}
</style>