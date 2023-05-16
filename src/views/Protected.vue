<template>
    <div>
        <h1>Greetengs, {{ username }}</h1>
        <button @click="logout">Log out</button>
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
        this.$router.push({name: 'home'})
    }
   }
}
</script>
