<script setup>
    import { RouterLink } from 'vue-router';
    import router from '@/router'
    import { socketStore } from '@/stores/socket.js'
    import { userStore } from '@/stores/user';

    // stores
    const user_s = userStore()  
    const sk_s = socketStore()

    async function logout(){
        let result = await user_s.logout()

        if(result)
            router.push('/login')
    }
</script>

<template>
    <header>
        <!-- <img alt='Vue logo' class='logo' src='@/assets/logo.svg' width='125' height='125' /> -->
        <div class='wrapper'>
            <nav>
                <RouterLink to='/'>Home</RouterLink>
                <RouterLink to='/play'>Play</RouterLink>
            </nav>
            <div class='online'>
                <label>online {{ sk_s.online }}</label>
            </div>
            <div class='logout'>
                <img :onclick='logout' src='/src/assets/images/logout.svg' alt='logout'>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import '@/assets/style.scss';

    header{
        // size
        width: 100%;
        height: 12.5vh;

        // display
        @include flex();

        .wrapper{
            border: 1px solid black;
            // size
            width: 60%;
            height: 80%;

            // display
            @include flex(row, center, space-between);

            .logout{
                // size
                width: 30px;
                height: 30px;

                img{
                    // size
                    width: 100%;
                    height: 100%;

                    // decoration
                    cursor: pointer;
                }
            }
        }
    }

</style>