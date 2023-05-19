<template>
    <ul>
        <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
        <li><RouterLink :to="{name: 'protected'}">Dashboard</RouterLink></li>
        <li><RouterLink :to="{name: 'invoices'}">Invoices</RouterLink></li>
    </ul>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
ul {
    background: white;
    padding: 10px;
    list-style: none;
    margin-right: 20px;
}

li {
    margin: 10px;
}
</style>