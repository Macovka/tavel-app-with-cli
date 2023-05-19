<template>
    <div>
        <h1>Greetengs, {{ username }}</h1>
        <TheButton @click="logout">Log out</TheButton>
        <RouterLink :to="{name: 'invoices'}">
            <TheButton>Invoices</TheButton>
        </RouterLink>
    </div>
</template>

<script>
export default {
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
