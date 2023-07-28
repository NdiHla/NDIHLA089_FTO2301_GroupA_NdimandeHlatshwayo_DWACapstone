<template>
  <FilterToolbar @filtersApplied="handlefiltersApplied" />
  <v-card width="100%" v-for="favorite in sortedFavoritesData" :key="favorite.id">
    <div class="favContainer" v-if="favorite.isFavorite" :key="checkKey">
      <div class="favImage">
        <v-img :src="favorite.image" width="200" cover></v-img>
      </div>
      <div class="favInfo">
        <v-card-title>
          {{ favorite.episodeTitle }}
        </v-card-title>
        <v-card-subtitle>
          {{ favorite.showTitle + ' - Season ' + favorite.season }}
          <v-chip>
            LAST UPDATED:
            {{ (new Date(favorite.lastUpdated)).getDate().toString().padStart(2, '0') }}/
            {{ ((new Date(favorite.lastUpdated)).getMonth() + 1).toString().padStart(2, '0') }}/
            {{ (new Date(favorite.lastUpdated)).getFullYear() }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text>{{ favorite.episodeDescription }}</v-card-text>
        <v-btn icon="mdi-play" size="large" color="green" @click="episodeSelectedHandler(favorite)"
          :data-key="favorite.id"></v-btn>
        <v-btn icon='mdi-close' variant="tonal" size="large" @click="removeFavorite(favorite)"
          :data-key="favorite.id"></v-btn>
        <v-chip>
          ADDED TO FAVORITES:
          {{ (new Date(favorite.dateAdded)).getDate().toString().padStart(2, '0') }}/
          {{ ((new Date(favorite.dateAdded)).getMonth() + 1).toString().padStart(2, '0') }}/
          {{ (new Date(favorite.dateAdded)).getFullYear() }}
          {{ (new Date(favorite.dateAdded)).getHours() }}:{{ (new Date(favorite.dateAdded)).getMinutes() }}
        </v-chip>
      </div>
    </div>
    <div v-else>Favorite removed</div>
  </v-card>
</template>


<script setup>

import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { supabase } from '@/clients/supabase';
import FilterToolbar from '@/components/FilterToolbar.vue'

const props = defineProps(['favoritesData'])

let sortMethod = ref("Unsorted")
let textFilter = ref("")

const handlefiltersApplied = (filters) => {
  console.log(filters)
  const { sortType, filterString } = filters
  sortMethod.value = sortType
  textFilter.value = filterString
}

const sortedFavoritesData = computed(() => {
  let sortedFavorites = [...props.favoritesData];

  if (sortMethod.value === "Alphabetical (A to Z)") {
    sortedFavorites.sort((a, b) => {
      let fa = a.showTitle.toLowerCase();
      let fb = b.showTitle.toLowerCase();
      if (fa < fb) {
        return -1;
      } else if (fa > fb) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  else if (sortMethod.value === "Alphabetical (Z to A)") {
    sortedFavorites.sort((a, b) => {
      let fa = a.showTitle.toLowerCase();
      let fb = b.showTitle.toLowerCase();
      if (fa > fb) {
        return -1;
      } else if (fa < fb) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  else if (sortMethod.value === "By earliest date updated") {
    sortedFavorites.sort((a, b) => (new Date(b.lastUpdated
    )).getTime() - (new Date(a.lastUpdated
    )).getTime());
  }
  else if (sortMethod.value === "By latest date updated") {
    sortedFavorites.sort((a, b) => (new Date(a.lastUpdated
    )).getTime() - (new Date(b.lastUpdated
    )).getTime());
  }

  return sortedFavorites;
}
);

const { currentlyPlaying } = storeToRefs(useAppStore())

let checkKey = ref(0)

const removeFavorite = async (favorite) => {
  try {
    await supabase
      .from('favorites')
      .update({ is_favorite: !favorite.isFavorite })
      .eq('showId', favorite.showId)
      .eq('season', favorite.season)
      .eq('episode', favorite.episode);
    console.log("Updated existing fav in database")

    // Update the isFavorite property in the episode object
    favorite.isFavorite = !favorite.isFavorite;
    checkKey.value++
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

const episodeSelectedHandler = (favorite) => {

  currentlyPlaying.value.showId = favorite.showId
  currentlyPlaying.value.showTitle = favorite.showTitle
  currentlyPlaying.value.episodeTitle = favorite.episodeTitle
  currentlyPlaying.value.episode = favorite.episode
  currentlyPlaying.value.file = favorite.file
  currentlyPlaying.value.timePlayed = favorite.timePlayed

  console.log(currentlyPlaying.value)

  return currentlyPlaying.value
}

</script>

<style scoped>
.v-card {
  margin: 1rem;
}

.favContainer {
  display: flex;
}

.favImage {
  flex: 1;
  margin: 1rem;
}

.favInfo {
  flex: 5
}
</style>
