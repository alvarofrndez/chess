<script setup>
import {userStore} from '@/stores/user'

// stores
const user_store = userStore()
const user = user_store.user

</script>

<template>
    <article class='user'>
        <section class='container-image'>
            <img :src='user.photo' :alt='user.username'>
        </section>
        <section class='container-data'>
            <div>
                <div>
                    <label class='up'>{{ user.username }}</label>
                    <label class='down'>nickname</label>
                </div>
            </div>
            <div>
                <div>
                    <label class='up'>{{ user.email }}</label>
                    <label class='down'>correo</label>
                </div>
            </div>
            <div>
                <div>
                    <label class='up'>{{ user.ranking }}</label>
                    <label class='down'>ranking</label>
                </div>
            </div>
            <div>
                <div>
                    <label class='up'>{{ user.ranking }}</label>
                    <label class='down'>ranking</label>
                </div>
            </div>
        </section>
    </article>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .user{
        // size
        width: 100%;
        height: 100%;

        // display
        @include flex(column, center, flex-start, 1rem);

        .container-image{
            // display
            @include flex();

            img{
                // size
                width: 100px;
                height: 100px;

                // decoration
                border-radius: 50%;
            }
        }

        .container-data{
            // size
            width: 100%;
            height: 80%;

            // decoration
            @include flex(row, center, center, 5px, wrap);

            &>div{
                // size
                width: calc(50% - 5px);
                height: calc(50% - 5px);

                // display
                @include flex();

                div{
                    // size
                    width: calc(100% - 3px);
                    height: calc(100% - 3px);

                    // display
                    @include flex(column, flex-start, flex-start);

                    // decoration
                    background-color: $h-c-black;
                    border-radius: 15px;

                    label{
                        // size
                        max-width: 100%;

                        // margin
                        padding: 10px;

                        // decoration
                        color: $h-c-white !important;
                        overflow: hidden;
                    }

                    .up{
                        // decoration
                        font-size: $h-f-text-big !important;
                        font-weight: bold;
                        text-justify: auto;
                    }

                    .down{
                        align-self: flex-end;
                        margin-top: auto;
                    }
                }
            }
        }
    }
</style>