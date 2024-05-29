<template>
    <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <div v-if="loading" class="text-green-500 text-lg">Loading...</div>
      <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
      <div v-if="episode">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">{{ episode.name }}</h1>
        <p><b>Air Date:</b> {{ episode.air_date }}</p>
        <p><b>Episode:</b> {{ episode.episode }}</p>
        <h2 class="text-2xl font-bold text-blue-600 mt-6">Characters</h2>
        <ul class="list-disc ml-6">
          <li v-for="character in episode.characters" :key="character.id">{{ character.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useQuery, gql } from '@vue/apollo-composable'
  
  const GET_EPISODE_DETAIL = gql`
    query Episode($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        characters {
          id
          name
        }
      }
    }
  `
  
  const route = useRoute()
  const id = route.params.id
  const { result, loading, error } = useQuery(GET_EPISODE_DETAIL, { id })
  const episode = ref(null)
  
  watchEffect(() => {
    if (result.value) {
      episode.value = result.value.episode
    }
  })
  </script>
  
  <style scoped>
  </style>
  