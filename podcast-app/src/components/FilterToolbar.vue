<template>
  <v-toolbar>
    <v-form @submit="handleFiltersSubmit">
      <v-select class="formItem" v-model="selectedSortType" label="Sort By" :items="sortTypesArray">
      </v-select>
      <v-text-field class="formItem" v-model="filterString" label="Filter By Show Title"></v-text-field>
      <v-btn class="formItem" type="submit" variant="outlined">Apply Filters</v-btn>
    </v-form>
  </v-toolbar>
</template>

<script setup>
import { ref } from 'vue'

let sortTypesArray = ["Unsorted", "Alphabetical (A to Z)", "Alphabetical (Z to A)", "By earliest date updated", "By latest date updated"]
let selectedSortType = ref("Unsorted")
let filterString = ref("")

const emit = defineEmits(['filtersApplied'])

const handleFiltersSubmit = (event) => {
  event.preventDefault()
  const filters = {
    sortType: selectedSortType.value,
    filterString: filterString.value,
  }
  emit('filtersApplied', filters)
}

</script>

<style scoped>
.v-toolbar {
  margin-top: 1rem;
}

.v-form {
  display: flex;
  width: 100%;
  align-items: center;
}

.formItem {
  margin: 0 1rem;
  width: 30%;
}

.formInputs {
  margin: 0 1rem;
  width: 30%;
}
</style>


<!-- <v-select @update:menu="handleGenreSelect" v-model="selectedGenre" label="Select
Genre" :items="genresArray"></v-select>


let genresArray = [
  "All Genres",
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
] -->