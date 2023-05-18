<template>
    <div>
        <section v-if="destination" class="destination">
            <h1>{{ destination.name }}</h1>
            <TheButton class="go-back" @click="$router.back()">&lt;&lt; Go Back</TheButton>
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" :alt="destination.name">
                <p>{{ destination.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ destination.name }}</h2>
            <div class="cards">
                <RouterLink
                    v-for="experience in destination.experiences"
                    :key="experience.slug"
                    :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
                >
                    <ExperienceCard :experience="experience"></ExperienceCard>
                </RouterLink>
            </div>
            <router-view />      
        </section>
    </div>
</template>

<script>
import ExperienceCard from '@/components/ExperienceCard.vue'
import TheButton from '@/components/TheButton.vue'

export default {
    components: {ExperienceCard, TheButton},
    data() {
        return {
            destination: ''
        }
    },
    props: {
        slug: {type: String, required: true}
    },
    methods: {
        async initData() {
            const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`)
            this.destination = await response.json();
        }
    },
    async created() {
        this.initData()
        this.$watch(() => this.$route.params, this.initData)
    }
}
</script>

 <style scoped>
 .go-back {
    background-color: #f1f1f1;
    color: black;
 }
</style>