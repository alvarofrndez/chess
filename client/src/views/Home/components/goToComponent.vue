<script setup>
    import { defineProps } from 'vue'

    const { path, name } = defineProps(['path', 'name'])
</script>

<template>
    <div class='go-to' :title="name">
        <RouterLink :to='path'>
            <img src='/src/assets/images/arrow.svg' :alt="'ir a ' + name">
        </RouterLink>
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .go-to{
        // size
        width: 50px;
        height: 50px;

        // position
        position: absolute;
        z-index: 10;

        // display
        @include flex();

        // decoration
        border-radius: 50%;
        transition: all .3s ease-in-out;
        cursor: pointer;

        a{
            // display
            @include flex();

            img{
                // size
                width: 25px;
                height: 25px;

                transition: all .3s ease-in-out;
            }
        }

        &:hover{
            a{
                img{
                    transform: translateY(-30%) translateX(30%);
                    transition: all .3s ease-in-out;
                }
            }
        }

        // &:hover{
        //     // size
        //     width: 200px;
        //     height: 200px;

        //     // decoration
        //     border-radius: 15px;
        //     transform: translateY(-80%);
        //     transition: all .3s ease-in-out;
        //     cursor: inherit;

        //     a{
        //         position: absolute;
        //         left: 0;
        //         bottom: 0;
        //         img{
        //             transform: translateY(-30%) translateX(30%);
        //             transition: all .3s ease-in-out;
        //         }
        //     }
        // }
    }
</style>