<script setup>
    import { ref } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user';

    // stores
    const user_s = userStore()

    let email = ref('')
    let password = ref('')

    async function login(){
        let result = await user_s.login(email.value, password.value)
    
        if(result)
            router.push('/')
            
    }
</script> 

<template>

    <div class='login-container'>
        <input type='text' name='email' id='email' v-model='email'>
        <input type='text' name='password' id='password' v-model='password'>
        <button :onclick='login'>Inicar sesión</button>
        <button :onclick="() => router.push('/singin')">registrarse</button>
    </div>

</template>

<style lang='scss'>
    @import '@/assets/style.scss';

</style>