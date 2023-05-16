<template>
    <section id="experience-show" v-if="experience">
        <h1>{{ experience.name }}</h1>
        <img :src="`/images/${experience.image}`" :alt="experience.name">
        <p>{{ experience.description }}</p>
    </section>
</template>

<script>
export default {
  props: {
    slug: {type: String, required: true},
    experienceSlug: {type: String, required: true},
  },
  data() {
      return {
        experience: ''
      }
  },
  async mounted() {
    await this.initData();
    this.$watch(() => this.$route.params, this.initData);
  },
    methods: {
        async initData() {
          const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`);
          this.experience = (await response.json())?.experiences?.find(experience => experience.slug === this.experienceSlug);
        }
    },
}

</script>
