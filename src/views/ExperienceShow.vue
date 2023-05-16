<template>
    <section id="experience-show">
        <h1>{{ experience.name }}</h1>
        <img :src="`/images/${experience.image}`" :alt="experience.name">
        <p>{{ experience.description }}</p>
    </section>
</template>

<script>
export default {
    data() {
        return {
            destination: ''
        }
    },
    props: {
        slug: {type: String, required: true},
        experienceSlug: {type: String, required: true}
    },
    methods: {
        async initData() {
            const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}.json`)
            this.destination = await response.json()
        }
    },
    async created() {
        this.initData()
        this.$watch(() => this.$route.params, this.initData)
    },
    computed: {
        experience() {
            return this.destination.experiences.find(experience => experience.slug === this.experienceSlug)
        }
    }
}
        
</script>