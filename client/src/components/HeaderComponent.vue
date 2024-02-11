<script setup>
    import { RouterLink } from 'vue-router';
    import router from '@/router'
    import { userStore } from '@/stores/user';

    // stores
    const user_s = userStore()  

    async function logout(){
        let result = await user_s.logout()

        if(result)
            router.push('/login')
    }
</script>

<template>
    <header>
        <div class='wrapper-container'>
            <div class='wrapper'>
                <img alt='logo chess' class='logo' src='@/assets/logo.svg'/>
                <nav>
                    <RouterLink to='/'>Home</RouterLink>
                    <RouterLink to='/play'>Play</RouterLink>
                </nav>
                
                <div class='logout'>
                    <img :onclick='logout' src='/src/assets/images/logout.svg' alt='logout'>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @import '@/assets/style.scss';

    header{
        // size
        width: 100%;
        height: 100px;

        // display
        @include flex();

        // position
        position: fixed;
        top: 0;

        .wrapper-container{
            // size
            width: 60%;
            height: 80%;

            // display
            @include flex();

            // decoration
            border-radius: 100px;
            box-shadow: 0px 10px 30px 6px $h-c-gray-transparent;

            .wrapper{
                // size
                width: calc(100% - 15px);
                height: calc(100% - 15px);

                // display
                @include flex(row, center, space-between);

                // decoration
                border-radius: 95px;

                .logo{
                    border: 1px solid black;
                    width: 70px;
                    height: 70px;

                    border-radius: 50px;
                }

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
        
    }

</style>