<template>
  <v-container v-if="appReady" fluid class="fill-height">
    <h2 style="text-align: center">You may be interested in...</h2>
    <RecommendedCarousel :recommended="recommendedArray" />
    <FilterToolbar @filtersApplied="handlefiltersApplied" />
    <PreviewCard v-for="(preview) in sortedPreviewData" :key="preview.id" :id="preview.id" :title="preview.title"
      :seasons="preview.seasons" :description="preview.description" :image="preview.image" :genres="preview.genres"
      :updated="preview.updated">
    </PreviewCard>
  </v-container>
  <div v-else>Loading</div>
</template>

<script setup>
import PreviewCard from '@/components/PreviewCard.vue'
import FilterToolbar from '@/components/FilterToolbar.vue'
import RecommendedCarousel from '@/components/RecommendedCarousel.vue';
import { reactive, ref, computed } from 'vue';

const getRecommended = (previews) => {
  const recommended = []
  recommended.push(previews[Math.floor((Math.random() * previews.length))])
  recommended.push(previews[Math.floor((Math.random() * previews.length))])
  recommended.push(previews[Math.floor((Math.random() * previews.length))])
  return recommended
}

let appReady = ref(false)
let previewData = reactive([])
let recommendedArray = reactive([])

const fetchPreviewData = async () => {
  try {
    const res = await fetch("https://podcast-api.netlify.app/shows");
    previewData = await res.json();
    recommendedArray = getRecommended(previewData)
    appReady.value = true
    return { previewData, recommendedArray };
  } catch (error) {
    console.error(error);
  }
};
fetchPreviewData()

let sortMethod = ref("Unsorted")
let textFilter = ref("")

const handlefiltersApplied = (filters) => {
  console.log(filters)
  const { sortType, filterString } = filters
  sortMethod.value = sortType
  textFilter.value = filterString
}

const sortedPreviewData = computed(() => {
  let sortedPreviews = [...previewData];

  if (sortMethod.value === "Alphabetical (A to Z)") {
    sortedPreviews.sort((a, b) => {
      let fa = a.title.toLowerCase();
      let fb = b.title.toLowerCase();
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
    sortedPreviews.sort((a, b) => {
      let fa = a.title.toLowerCase();
      let fb = b.title.toLowerCase();
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
    sortedPreviews.sort((a, b) => (new Date(b.updated)).getTime() - (new Date(a.updated)).getTime());
  }
  else if (sortMethod.value === "By latest date updated") {
    sortedPreviews.sort((a, b) => (new Date(a.updated)).getTime() - (new Date(b.updated)).getTime());
  }

  return sortedPreviews;
});

</script>

<style scoped></style>


<!-- computed: {
	sortedArray() {
		let sortedRecipes = this.recipes;
		
    if (sortMethod == 'alphabetically' {
      sortedRecipes = sortedRecipes.sort((a,b) => {
			let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
			if (fa < fb) {
				return -1
			}
			if (fa > fb) {
				return 1
			}
			return 0
		})
    } else if (sortMethod == 'cookingTime' {
      sortedRecipes = sortedRecipes.sort((a,b) => {
        return a.cookingTime - b.cookingTime
    })
} -->


<!-- computed: {
  filteredRecipes() {
    let tempRecipes = this.recipes
    
    tempRecipes = tempRecipes.filter((item) => {
      return (item.cookingTime <= this.maxCookingTime)
    })
    
    return tempRecipes;
  }
} -->