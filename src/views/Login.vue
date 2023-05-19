<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input v-model="username" name="username" type="text" class="input">
            <label for="password">Password</label>
            <input v-model="password" name="password" type="text" class="input">
            <BaseButton class="btn">Login</BaseButton>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            //Auth user
            //pretend that user is succesfully authenticated
            window.user = this.username
            const redirectPath = this.$route.query.redirect || '/protected'
            this.$router.push(redirectPath)
        }
    }
}
</script>