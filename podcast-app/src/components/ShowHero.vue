<template>
  <v-card class="mx-auto" max-width="500">
    <v-img :src="props.showData.image" height="400" cover></v-img>

    <v-card-title>
      {{ props.showData.title }}
      <v-chip>
        {{ props.showData.seasons.length }} SEASONS
      </v-chip>
    </v-card-title>

    <div>
      <v-divider></v-divider>

      <v-card-text>
        {{ props.showData.description }}
      </v-card-text>
    </div>

    <div class="seasonToggleContainer">
      <v-select @update:menu="handleSeasonSelect" v-model="selectedSeason" label="Select Season"
        :items="selectArray"></v-select>

    </div>
  </v-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
const props = defineProps(['showData'])

let selectArray = reactive(["All Seasons"])

props.showData.seasons.map((season) => {
  selectArray.push(`Season ${season.season}`)
  return selectArray
})

let selectedSeason = ref("")

const handleSeasonSelect = () => {
  console.log(selectedSeason.value)
}

</script>

<style scoped>
.v-chip {
  margin-left: 1rem;
}

.seasonToggleContainer {
  display: flex;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 1.5rem;
}
</style>

