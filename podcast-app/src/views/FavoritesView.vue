<template>
  <v-container fluid class="fill-height" v-if="favoritesDataReady">
    <FavoritesList :favoritesData="favoritesData"></FavoritesList>
    <div class="bottomSpacer"></div>
  </v-container>
  <div v-else>Loading</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FavoritesList from '@/components/FavoritesList.vue'
import { supabase } from '@/clients/supabase';

let favoritesDataReady = ref(false) // remember to change back to false default

let favoritesData = reactive([])

const fetchFavoritesData = async () => {
  try {
    let favoritesArray = []
    let { data } = await supabase
      .from('favorites')
      .select('*')
      .eq('is_favorite', true)
    for (const item of data) {
      favoritesArray.push({
        id: item.id,
        showId: item.showId,
        showTitle: item.show_name,
        season: item.season,
        dateAdded: item.date_added,
        lastUpdated: item.last_updated,
        episode: item.episode,
        episodeTitle: item.episode_title,
        episodeDescription: item.episode_description,
        image: item.season_image,
        timePlayed: item.time_played,
        file: item.file,
        isFavorite: true,
      })
    }
    favoritesData = favoritesArray
    favoritesDataReady.value = true
  } catch (error) {
    console.error(error);
  }
};

fetchFavoritesData()

</script>

<style scoped>
.v-container {
  justify-content: center;
}

.bottomSpacer {
  height: 20vh;
}
</style>