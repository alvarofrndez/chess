<script setup>
    import { ref } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user';
    import BackgroundComponent from '@/components/BackgroundComponent.vue';

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
    
    <BackgroundComponent />
    
    <section class='login-container'>
        <div class='image-container'>
            <img src='/src/assets/images/rey-blanco.png' alt='imagen de peon blanco'>
        </div>
        <div class='inputs-container'>
            <div class='inputs-container-email'>
                <div class='data-container'>
                    <label for='email'>Correo</label>
                    <input type='text' name='email' id='email' v-model='email'>
                </div>
            </div>
            <div class='inputs-container-password'>
                <div class='data-container'>
                    <label for='password'>Contraseña</label>
                    <input type='password' name='password' id='password' v-model='password'>
                </div>
            </div>
        </div>
        <div class='button-container'>
            <button :onclick='login'>Inicar sesión</button>
            <button :onclick="() => router.push('/singin')">Ir a registrarse</button>
        </div>
    </section>

</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    @include auth();
</style>