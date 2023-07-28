<template>
  <v-container v-if="showDataReady" class="fill-height">
    <ShowHero :showData="showData"></ShowHero>
    <ShowEpisodesList :showData="showData"></ShowEpisodesList>
  </v-container>
  <div v-else>Loading</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import ShowHero from '@/components/ShowHero.vue'
import ShowEpisodesList from '@/components/ShowEpisodesList.vue'
import { supabase } from '@/clients/supabase';

let showDataReady = ref(false)

const { currentShowId } = storeToRefs(useAppStore())

let showData = reactive({})

const fetchShowData = async () => {
  try {
    if (currentShowId.value) {
      const URL = `https://podcast-api.netlify.app/id/${currentShowId.value}`;
      const res = await fetch(URL);
      let transformedShowData = await res.json();

      // Collect all the episodes to check if they are in DB
      const episodesToCheck = [];
      for (const season of transformedShowData.seasons) {
        for (const episode of season.episodes) {
          episodesToCheck.push({
            file: episode.file,
            showId: currentShowId.value,
            season: season.season,
            episode: episode.episode,
            title: episode.title,
            description: episode.description, // Preserve the original description
          });
        }
      }

      // Fetch DB entries for all episodes in parallel
      const favoritePromises = episodesToCheck.map(({ showId, season, episode }) => {
        return supabase
          .from('favorites')
          // .select('id')
          .select('id, is_favorite, time_played')
          .eq('showId', showId)
          .eq('season', season)
          .eq('episode', episode)
      });

      const favoritesResponses = await Promise.all(favoritePromises);

      // Update isFavorite flag and timePlayed value for each episode
      for (let i = 0; i < episodesToCheck.length; i++) {
        const { data } = favoritesResponses[i];
        const episode = episodesToCheck[i];
        if (data.length > 0) {
          episode.isFavorite = data[0].is_favorite;
          episode.timePlayed = data[0].time_played;
        } else {
          episode.isFavorite = false;
          episode.timePlayed = 0;
          // Set to defaults if there are no matching records
        }
      }

      // Replace episodes with updated episodes in their respective seasons
      for (const season of transformedShowData.seasons) {
        season.episodes = episodesToCheck
          .filter((episode) => episode.season === season.season)
          .map((episode) => ({
            title: episode.title,
            description: episode.description, // Preserve the original description
            episode: episode.episode,
            file: episode.file,
            isFavorite: episode.isFavorite,
            timePlayed: episode.timePlayed
          }));
      }
      showData = transformedShowData;
      showDataReady.value = true;
      return { showData };
    }
  } catch (error) {
    console.error(error);
  }
};

fetchShowData()

</script>

<style scoped>
.v-container {
  justify-content: center;
}
</style>