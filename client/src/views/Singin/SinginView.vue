<script setup>
    import { ref } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user'
    import BackgroundComponent from '@/components/BackgroundComponent.vue'
    import InputComponent from './components/InputComponent.vue'

    // stores
    const user_s = userStore()

    let username = ref('')
    let email = ref('')
    let password = ref('')

    let username_error = ref({
        error: false,
        message: undefined
    })
    let email_error = ref({
        error: false,
        message: undefined
    })
    let password_error = ref({
        error: false,
        message: undefined
    })

    async function login(){

        if(voidInputs())
            return

        const result = await user_s.singIn(username.value, email.value, password.value)

        if(result)
            router.push('/')
    }

    function voidInputs(){
        /**
         * Comprueba si los inputs están vacios, muestra y da valor al mensaje en 
         * caso de que lo estén
         * 
         * return: true en caso de que algún input esté vacío, false si todo es correcto
         */
        if(username.value == ''){
            username_error.value.error = true
            username_error.value.message = 'El nombre de usuairo no puede estar vacío'
            return true
        }else{
            username_error.value.error = false
        }

        if(email.value == ''){
            email_error.value.error = true
            email_error.value.message = 'El correo no puede estar vacío'
            return true
        }else{
            email_error.value.error = false
        }

        if(password.value == ''){
            password_error.value.error = true
            password_error.value.message = 'La contraseña no puede estar vacía'
            return true
        }else{
            password_error.value.error = false
        }

        return false
    }

</script> 

<template>

    <BackgroundComponent />
    
    <section class='login-container'>
        <div class='image-container'>
            <img src='/src/assets/images/rey-blanco.png' alt='imagen de peon blanco'>
        </div>
        <div class='inputs-container'>
            <InputComponent v-model:value="username" type='username' :error="username_error"/>
            <InputComponent v-model:value="email" type='email' :error="email_error"/>
            <InputComponent v-model:value="password" type='password' :error="password_error"/>
        </div>
        <div class='button-container'>
            <button :onclick='login'>Registrar</button>
            <button :onclick="() => router.push('/login')">Ir a login</button>
        </div>
    </section>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    @include auth();
</style>