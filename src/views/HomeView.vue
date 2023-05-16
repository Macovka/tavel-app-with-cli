<template>
  <div class="home">
    <h1>All Destinations</h1>
      <div class="destinations">
        <AppLink 
          v-for="destination in destinations"
          :key="destination.id"
          :to="{name: 'destination.show', params: {slug: destination.slug}}"
        >
          <h2>{{ destination.name }}</h2>
          <img class="home img" :src="`/images/${destination.image}`" :alt="destination.name">
        </AppLink>
      </div>
    </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  }
};
</script>
