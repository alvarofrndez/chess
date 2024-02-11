<script setup>
    import { ref, onUnmounted } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user'
    import { regExStore } from '@/stores/regEx'
    import BackgroundComponent from '@/components/BackgroundComponent.vue'
    import InputComponent from './components/InputComponent.vue'

    // stores
    const user_s = userStore()
    const regEx_s = regExStore()

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

    async function singin(){
        /**
         * Registra un usuario en la base de datos is todos sus campos son validos
         */
        if(invalidInputs())
            return

        const result = await user_s.singIn(username.value, email.value, password.value)

        if(result)
            router.push('/')
    }

    function invalidInputs(){
        /**
         * Comprueba si los inputs son validos
         * 
         * return: true en caso de que algún input esté vacío, false si todo es correcto
         */
        if(invalidUsername()){
            email_error.value.error = false
            password_error.value.error = false
            return true
        }else{
            username_error.value.error = false
        }

        if(invalidEmail()){
            password_error.value.error = false
            return true
        }else{
            email_error.value.error = false
        }

        if(invalidPassword()){
            return true
        }else{
            password_error.value.error = false
        }

        return false
    }

    function invalidUsername(){
        /**
         * Comprueba que el nombre de usuario sea valido
         * 
         * return: devuelve true en caso que no sea valido y false en caso que se valido
         */
        if( username.value == ''){
            username_error.value.message = 'El nombre de usuario no puede estar vacío'
            username_error.value.error = true
            return true
        }

        if(!regEx_s.checkUsername(username.value)){
            username_error.value.message = `Debe de tener menos de 25 caracteres y no puede incluir /'{}"`
            username_error.value.error = true
            return true
        }

        return false
    }

    function invalidEmail(){
        /**
         * Comprueba que el email sea valido
         * 
         * return: devuelve true en caso que no sea valido y false en caso que se valido
         */
        if( email.value == ''){
            email_error.value.message = 'El correo no puede estar vacío'
            email_error.value.error = true
            return true
        }

        if(!regEx_s.checkEmail(email.value)){
            console.log('invalido')
            email_error.value.message = 'Debe cumplir el formato de correo'
            email_error.value.error = true
            return true
        }

        return false
    }

    function invalidPassword(){
        /**
         * Comprueba que la contraseña sea valida
         * 
         * return: devuelve true en caso que no sea valido y false en caso que se valido
         */
        if( password.value == ''){
            password_error.value.message = 'La contraseña no puede estar vacía'
            password_error.value.error = true
            return true
        }

        if(!regEx_s.checkPassword(password.value)){
            password_error.value.message = 'Debe incluir una letra minúscula, mayúscula, número caracter especial !@#$%^&*()_+ y 8 caractéres mínimo '
            password_error.value.error = true
            return true
        }

        return false
    }

    function handleKeyDown(e){
        /**
         * Ejecuta el singin en caso de que se pulse enter
         */
        if(e.key == 'Enter'){
            singin()
        }
    }

    onUnmounted(() => {
        /**
         * Elimina el evento cuando se desmonta el componente
         */
        document.removeEventListener('keydown', handleKeyDown);
    })

    document.addEventListener('keydown', handleKeyDown);
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
            <button :onclick='singin'>Registrar</button>
            <button :onclick="() => router.push('/login')">Ir a login</button>
        </div>
    </section>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    @include auth();
</style>