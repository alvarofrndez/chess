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
    <div class='background-image-container'>
        <img class='background-image' src='/src/assets/images/peon-negro.png'/>
    </div>
    <div class='login-container'>
        <input type='text' name='email' id='email' v-model='email'>
        <input type='text' name='password' id='password' v-model='password'>
        <button :onclick='login'>Inicar sesión</button>
        <button :onclick="() => router.push('/singin')">registrarse</button>
    </div>

</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    .background-image-container{
        // size
        width: 60vw;
        height: 80vh;

        // position
        position: absolute;

        // decoration
        perspective: 700px;

        .background-image{
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transform: rotateX(45deg);
        }
    }
</style>