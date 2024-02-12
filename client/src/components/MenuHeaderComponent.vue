<script setup>
    import { ref, onUnmounted } from 'vue'
    import router from '@/router'
    import { userStore } from '@/stores/user';

    // stores
    const user_s = userStore()  
    let menu_open = ref(false)

    // variables
    const options = [
        {
            path: '/settings',
            name: 'Perfíl'
        },
        {
            path: '/api',
            name: 'Api'
        },
        {
            path: '/hosting',
            name: 'Hosting'
        },
        {
            path: '/planning',
            name: 'Precios'
        }
    ]

    // functions
    async function logout(){
        let result = await user_s.logout()

        if(result)
            router.push('/login')
    }

    function handleCloseMenu(event){
        const profile_photo = document.getElementById('profile-photo');
      
        if (event.target !== profile_photo) {
            menu_open.value = false
        }
    }

    onUnmounted(() => {
        document.removeEventListener('click', handleCloseMenu);
    })

    document.addEventListener('click', handleCloseMenu);
</script>

<template>
    <div class='container-menu'>
        <div class='container-avatar' :onclick='() => menu_open = !menu_open'>
            <img :src='user_s.user.photo' :alt=user_s.user.username id='profile-photo'/>
        </div>
        <div v-if='menu_open' class='menu' id='menu'>
            <div class='container'>
                <div class='container-avatar mobile' :onclick='() => menu_open = !menu_open'>
                    <img :src='user_s.user.photo' :alt='user_s.user.username'/>
                </div>
                <div class='user'>
                    <h4>{{user_s.user.username}}</h4>
                </div>
                <nav class='options'>
                    <li v-for="option of options" :class="router.path === option.path ? 'actual' : ''" :key=option.path>
                        <RouterLink :to='option.path'>{{option.name}}</RouterLink>
                    </li>
                </nav>
                <div :onclick='logout' class='logout'>
                    <img src='/src/assets/images/logout.svg' alt='logout'>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .container-menu{
        width: 50px;
        height: 50px;
        // display
        @include flex(column, center, flex-end);

        // position
        position: relative;

        .container-avatar{
            // size
            width: 100%;
            height: 100%;

            // display
            @include flex(row, flex-end);

            // decoration
            cursor: pointer;

            img{
                width: 100%;
                height: 100%;

                // decoration
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .menu{
            // size
            width: 200px;
            height: 300px;

            // position
            position: absolute;
            top: calc($h-m-header - ($h-m-header - $h-h-header));

            // decoration
            background-color: $h-c-white-light;
            border-radius: 20px;

            @media screen and (max-width: 600px) {
                // size
                width: 100vw;
                height: 100vh;

                // position
                position: fixed;
                left: 0;
                top: 0;

                // decoration
                border-radius: 0;
                border: none;

                .container{
                    // size
                    width: 100%;
                    height: 100%;

                    .mobile{
                        height: 15%;

                        img{
                            width: 70px;
                            height: 70px;
                        }
                    }

                    .user{
                        height: 15%;
                    }

                    .options{
                        height: 60%;
                    }

                    .logout{
                        height: 10%;
                    }
                }
            }
                
            .container{
                // size
                width: 100%;
                height: 100%;

                // display
                @include flex(column);

                // margin
                padding: 0;

                .user{
                    // size
                    width: 100%;
                    height: 20%;

                    // display
                    @include flex();

                    // decoration
                    border-radius: 20px 20px 0 0;
                    
                    h4{
                        // display
                        @include flex(row, flex-start, center);

                        // margin
                        margin: 0;
                        padding: 0 1vw;

                        // decoration
                        font-weight: bold;

                        @media screen and (max-width: 800px) {
                            padding: 0 2vw;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        border-radius: 0;
                    }
                }

                .options{
                    // size
                    width: 100%;
                    height: 65%;

                    // display
                    @include flex(column, flex-start, flex-start);
                    
                    li{
                        // size
                        width: 100%;
                        height: calc(100% / 4);

                        // display
                        @include flex();

                        &:hover{
                            // decoration
                            background-color: $h-c-gray-transparent;
                            cursor: pointer;
                        }

                        a{
                            // size
                            width: 100%;

                            // margin
                            padding: 0 1vw;

                            // decoration
                            text-decoration: none;
                            color:black;

                            @media screen and (max-width: 800px) {
                                padding: 0 2vw;
                            }

                            @media screen and (max-width: 600px) {
                                width: auto;
                                padding: 0;
                            }
                        }

                        @media screen and (max-width: 600px) {
                            @include flex(column, center, center)
                        }
                    }

                    .actual{
                        // decoration
                        background-color: #f1f1f1;

                        a{
                            // decoration
                            color: $h-c-black;
                            font-weight: bold;
                        }
                    }
                }

                .logout{
                    // size
                    width: 100%;
                    height: 15%;

                    // display
                    @include flex();

                    // decoration
                    border-radius: 0 0 20px 20px;
                    cursor: pointer;

                    img{
                        // size
                        width: 30px;
                        height: 30px;
                    }

                    &:hover{
                        background-color: $h-c-gray-transparent;
                    }

                    @media screen and (max-width: 600px) {
                        border-radius: 0;
                    }
                }

                .mobile{
                    // size
                    width: 100%;

                    // display
                    display: none;

                    @media screen and (max-width: 600px) {
                        // display
                        @include flex();
                    }
                }

                @media screen and (max-width: 600px) {
                    height: 100vh;
                    width: 100vw;
                }
            }
        }
    }
</style>