<template>
  <div class="bg-black text-white flex">
    <!-- Navigation bar -->
    <nav class="navbar fixed top-0 left-0 h-full w-20 flex flex-col items-center p-4 bg-black">
      <!-- Logo -->
      <div class="logo mb-4">
        <img src="./images.jpg" alt="Logo" class="h-8 rounded-full">
      </div>
      <!-- Navigation Links -->
      <ul class="nav-links flex flex-col space-y-2">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/episodes" class="nav-link">Episodes</router-link></li>
        <li><router-link to="/characters" class="nav-link">Characters</router-link></li>
        <li><router-link to="/locations" class="nav-link">Locations</router-link></li>
      </ul>
    </nav>

    <!-- Content Section -->
    <div class="content-section ml-20">
      <!-- Show details -->
      <div class="p-8">
        <h1 class="text-4xl font-bold mb-6">Rick and Morty</h1>

        <!-- Carousel of show images -->
        <Carousel class="mb-8" />

        <!-- Show details -->
        <div>
          <p class="text-lg font-semibold mb-2">Description/Storyline of the show</p>
          <p class="mb-4">Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon. The show follows the misadventures of an eccentric and alcoholic scientist named Rick Sanchez, who drags his good-hearted but easily influenced grandson Morty Smith on dangerous adventures across the multiverse.</p>
          <p class="text-lg font-semibold mb-2">Genre</p>
          <p class="mb-4">Science Fiction, Adventure, Comedy</p>
          <p class="text-lg font-semibold mb-2">Creators</p>
          <p class="mb-4">Justin Roiland, Dan Harmon</p>
          <p class="text-lg font-semibold mb-2">Stars</p>
          <p class="mb-4">Justin Roiland, Chris Parnell, Spencer Grammer, Sarah Chalke</p>
          <p class="text-lg font-semibold mb-2">Rating</p>
          <p class="mb-4">9.2/10 (IMDb)</p>
        </div>
      </div>

      <!-- Episodes -->
      <div class="episodes-section p-8">
        <h2 class="text-2xl font-semibold mb-4">Episodes</h2>
        <!-- List of episodes -->
        <div class="grid grid-cols-3 gap-4">
          <div v-for="episode in episodes" :key="episode.id" class="bg-gray-800 p-4 rounded-lg shadow">
            <router-link :to="{ name: 'episode-detail', params: { id: episode.id } }" class="block">
              <p class="font-semibold">{{ episode.name }}</p>
              <p class="text-sm">{{ episode.air_date }}</p>
              <p class="text-sm">{{ episode.episode }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Characters -->
      <div class="characters-section p-8">
        <h2 class="text-2xl font-semibold mb-4">Characters</h2>
        <!-- List of characters -->
        <div class="grid grid-cols-3 gap-4">
          <div v-for="character in characters" :key="character.id" class="Characters">
            <router-link :to="{ name: 'character-detail', params: { id: character.id } }">
              <!-- Add inline style for yellow shadow -->
              <img :src="character.image" alt="" class="character-image" style="box-shadow: 0 4px 6px rgba(255, 255, 0, 0.5);">
              <p>{{ character.name }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Locations -->
      <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4">Locations</h2>
        <!-- List of locations -->
        <div class="grid grid-cols-3 gap-4">
          <div v-for="location in locations" :key="location.id" class="bg-gray-800 p-4 rounded-lg shadow">
            <router-link :to="{ name: 'location-detail', params: { id: location.id } }" class="block">
              <p class="font-semibold">{{ location.name }}</p>
              <p class="text-sm">{{ location.dimension }}</p>
              <p class="text-sm">{{ location.type }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer bg-black text-white p-4 fixed bottom-0 left-0 w-full">
    <p>&copy; 2024 Rick and Morty</p>
  </footer>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { RouterLink } from 'vue-router'
import { gql } from '@apollo/client/core'
import { ref, watchEffect } from 'vue'
import Carousel from './Carousel.vue'  // Import the Carousel component

// Define the new GraphQL queries
const GET_ALL_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`

const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

const GET_ALL_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        dimension
        type
      }
    }
  }
`

// Fetch data for episodes, characters, and locations
const { result: episodesResult, loading: loadingEpisodes, error: errorEpisodes } = useQuery(GET_ALL_EPISODES)
const { result: charactersResult, loading: loadingCharacters, error: errorCharacters } = useQuery(GET_ALL_CHARACTERS)
const { result: locationsResult, loading: loadingLocations, error: errorLocations } = useQuery(GET_ALL_LOCATIONS)

// Extract data from the query results
const episodes = ref([])
const characters = ref([])
const locations = ref([])

watchEffect(() => {
  if (episodesResult.value) {
    episodes.value = episodesResult.value.episodes.results
  }
  if (charactersResult.value) {
    characters.value = charactersResult.value.characters.results
  }
  if (locationsResult.value) {
    locations.value = locationsResult.value.locations.results
  }
})
</script>

<style scoped>
.navbar .nav-link {
  color: white;
  text-decoration: none;
}
.navbar .nav-link:hover {
  color: #ccc;
}
.character-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
