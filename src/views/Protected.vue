<template>
    <div id="protected">
        <h1>Greetengs, {{ username }}</h1>
        <BaseButton @click="logout">Log out</BaseButton>
        <RouterLink :to="{name: 'invoices'}">
            <BaseButton>Invoices</BaseButton>
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
