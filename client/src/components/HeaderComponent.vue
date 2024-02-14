<script setup>
    import { RouterLink } from 'vue-router'
    import router from '@/router'
    import MenuHeaderComponent from './MenuHeaderComponent.vue';
</script>

<template>
    <header>
        <div class='wrapper-container'>
            <div class='wrapper'>
                <img :onclick="() => router.push('/')" class='logo' src='@/assets/images/logo-chess.png' alt='logo chess'/>
                <div class='header-right'>
                    <nav>
                        <li>
                            <RouterLink to='/play'>Jugar</RouterLink>
                        </li>
                        <li>
                            <RouterLink to='/tournament'>Torneos</RouterLink>
                        </li>
                        <li>
                            <RouterLink to='/ranking'>Clasificación</RouterLink>
                        </li>
                    </nav>
                    <MenuHeaderComponent/>
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
        height: $h-h-header;

        // display
        @include flex();

        // position
        position: fixed;
        top: 0;

        .wrapper-container{
            // size
            width: 80%;
            height: 80%;

            // display
            @include flex();

            // decoration
            border-radius: 100px;
            box-shadow: 0px 0px 40px 0px $h-c-gray;
            background-color: $h-c-white;

            .wrapper{
                // size
                width: calc(100% - 15px);
                height: calc(100% - 15px);

                // display
                @include flex(row, center, space-between);

                // decoration
                border-radius: 95px;

                .logo{
                    // size
                    width: 50px;
                    height: 50px;

                    // position
                    margin-left: -2px;

                    // decoration
                    border-radius: 50px;
                    cursor: pointer;
                }

                .header-right{
                    // size
                    width: calc(100% / 3 + 100% / 20);
                    height: 100%;

                    // display
                    @include flex(row, center, space-between);

                    nav{
                        width: 70%;

                        @include flex(row, center, space-between);

                        li{
                            // size
                            height: 35px;

                            // display
                            @include flex(column);

                            // position
                            position: relative;

                            // decoration
                            cursor: pointer;

                            a{
                                // size
                                height: 50%;

                                // decoration
                                text-decoration: none;
                            }

                            &::after{
                                align-self: flex-start;
                                position: absolute;
                                content: '';
                                width: 0%;
                                height: 2px;
                                bottom: 0;
                                right: 0;
                                background-color: $h-c-black;
                                visibility: hidden;
                                transition: all 0.2s;
                            }

                            &:hover{
                                &::after{
                                    left: 0;
                                    width: 100%;
                                    visibility: visible;
                                    transition: all 0.2s;
                                }
                            }
                        }

                        @media screen and (max-width: 900px) {
                            li{
                                a{
                                    font-size: $h-s-text-small;
                                }
                            }
                        }

                        @media screen and (max-width: 700px) {
                            gap: 2rem;

                            li{
                                a{
                                    font-size: $h-s-text-small;
                                }
                            }
                        }

                        @media screen and (max-width: 600px) {
                            display: none;
                        }
                    }
                }
            }
        }
        
    }

</style>