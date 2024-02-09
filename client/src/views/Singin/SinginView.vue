<script setup>
    import { ref } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user';

    // stores
    const user_s = userStore()

    let username = ref('')
    let email = ref('')
    let password = ref('')

    async function login(){
        const result = await user_s.singIn(username.value, email.value, password.value)

        if(result)
            router.push('/')
    }

</script> 

<template>
    <input type='text' name='username' id='username' v-model='username'>
    <input type='text' name='email' id='email' v-model='email'>
    <input type='text' name='password' id='password' v-model='password'>
    <button :onclick='login'>Registrar</button>
    <button :onclick="() => router.push('/login')">iniciar sesión</button>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';


</style>