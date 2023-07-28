<template>
  <router-view />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { supabase } from "@/clients/supabase";
import { onMounted } from 'vue'

window.addEventListener("beforeunload", uploadLastPlayed)

const { currentlyPlaying } = storeToRefs(useAppStore())

async function uploadLastPlayed() {
  const localUser = await supabase.auth.getSession()
  const lastPlayed = currentlyPlaying.value
  try {
    const { data, error } = await supabase
      .from('last_played_tracks')
      .insert({
        user_email: localUser.data.session.user.email,
        time_added: new Date(),
        showId: lastPlayed.showId,
        show_title: lastPlayed.showTitle,
        episode_title: lastPlayed.episodeTitle,
        episode: lastPlayed.episode,
        season: lastPlayed.season,
        file: lastPlayed.file,
        time_played: lastPlayed.timePlayed,
      });
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
    }
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }
}

async function fetchLastPlayed() {
  const localUser = await supabase.auth.getSession()
  const lastPlayed = currentlyPlaying.value
  try {
    const { data, error } = await supabase
      .from('last_played_tracks')
      .select('*')
      .eq('user_email', localUser.data.session.user.email)
      .order('time_added', { ascending: false })
      .limit(1)
    if (data.length > 0) {
      lastPlayed.showId = data[0].showId
      lastPlayed.showTitle = data[0].show_title
      lastPlayed.episodeTitle = data[0].episode_title
      lastPlayed.episode = data[0].episode
      lastPlayed.season = data[0].season
      lastPlayed.file = data[0].file
      lastPlayed.timePlayed = data[0].time_played
      // console.log('Data fetched successfully:', data)
    } else if (error) {
      console.error('Error fetching data:', error.message);
      return
    }
    else {
      console.log('No data for played tracks')
      return
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

onMounted(() => {
  // console.log(`the component is now mounted.`)
  fetchLastPlayed()
})

// onBeforeUnmount(() => {
//   uploadLastPlayed()
//   alert(`the component is being unmounted`)
// })

</script>