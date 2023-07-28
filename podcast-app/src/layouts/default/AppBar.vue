<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-gentoo" />
      Poddle
    </v-app-bar-title>
    <nav>
      
      <div class="buttonWrapper">
        <v-btn variant="tonal" size="small" rounded="xl">
          <router-link to="/show">Show View</router-link>
        </v-btn>
      </div>

      <div class="buttonWrapper">
        <v-btn variant="tonal" size="small" rounded="xl">
          <router-link to="/login">Login</router-link>
        </v-btn>
      </div>

      <div class="buttonWrapper">
        <v-btn variant="tonal" size="small" rounded="xl" prepend-icon="mdi-heart">
          <router-link to="/favorites">Favorites</router-link>
        </v-btn>
      </div>

      <div class="buttonWrapper">
        <v-btn variant="tonal" size="small" rounded="xl" prepend-icon="mdi-home">
          <router-link to="/">Home</router-link>
        </v-btn>
      </div>
    </nav>
  </v-app-bar>
</template>

<script setup>
  //
</script>

<style scoped>
  nav{
    display: flex;
  }
  .buttonWrapper {
    margin: 1rem;
  }

  a {
    text-decoration: none;
    color: white
  }
</style>