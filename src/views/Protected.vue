<template>
    <div>
        <h1>Greetengs, {{ username }}</h1>
        <TheButton @click="logout">Log out</TheButton>
    </div>
</template>

<script>
import TheButton from '@/components/TheButton.vue'

export default {
    components: {TheButton},
    data() {
        return {
            username: window.user
        }
    },
    methods: {
        logout() {
            window.user = null
            this.$router.push({name: 'login'})
        }
    }
}
</script>
