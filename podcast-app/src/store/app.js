// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const currentShowId = ref(null);

  const currentlyPlaying = ref({
    showId: null,
    showTitle: null,
    episodeTitle: null,
    episode: null,
    season: null,
    file: null,
    timePlayed: 0,
  });

  return { currentShowId, currentlyPlaying };
});
