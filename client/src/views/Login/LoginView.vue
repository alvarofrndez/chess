<script setup>
    import { ref } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user';
    import BackgroundComponent from './components/BackgroundComponent.vue';

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
                <label for='email'>Correo</label>
                <input type='text' name='email' id='email' v-model='email'>
            </div>
            <div class='inputs-container-password'>
                <label for='password'>Contraseña</label>
                <input type='password' name='password' id='password' v-model='password'>
            </div>
        </div>
        <div class='button-container'>
            <button :onclick='login'>Inicar sesión</button>
            <button :onclick="() => router.push('/singin')">registrarse</button>
        </div>
    </section>

</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    .login-container{
        // size
        width: 30%;
        height: 60vh;

        // position
        z-index: 10;

        // display
        @include flex(column);

        .image-container{
            // size
            height: 20%;

            // position
            z-index: 6;

            // decoration
            transform: translateY(40%);
        }

        .inputs-container{
            // size
            height: 50%;
            width: 70%;

            // position
            z-index: 5;

            // display
            @include flex(column, center, center, 2rem);

            // decoration
            background-color: $h-c-black;
            border-radius: 15px;
            

            &-email, &-password{
                // display
                @include flex(column, flex-start, center, .5rem);

                *{
                    // decoration
                    color: $h-c-white !important;
                }

                label{
                    // decoration
                    font-size: $h-f-text-medium !important;
                }

                input{
                    // decoration
                    background-color: transparent;
                    border: none;
                    border-bottom: 1px solid $h-c-white;
                    outline: none;
                }
            }
        }

        .button-container{
            // size
            height: 20%;
            width: 70%;

            // display
            @include flex(row, flex-start, space-evenly);

            button{
                // size
                width: calc(100% / 3);
                height: 40%;

                // decoration
                transform: translateY(-30%);
                transition: transform .2s ease-in;
                cursor: pointer;
                border-radius: 10px;
                border: none;
                background-color: $h-c-white;
                box-shadow: 0px 10px 30px 6px $h-c-gray-transparent;

                &:hover{
                    // decoration
                    transform: translateY(-5%);
                    transition: transform .2s ease-in;
                }

                &:nth-child(2){
                    background-color: $h-c-gray;
                }
            }
        }
    }
</style>