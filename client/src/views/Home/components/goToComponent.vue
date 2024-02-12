<script setup>
    import { defineProps } from 'vue'

    const { path, name, data } = defineProps(['path', 'name', 'data'])
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
        position: absolute;

        // display
        @include flex();

        // decoration
        background-color: $h-c-white-light;
        border-radius: 50%;
        transform: translateY(-50%);
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
            // size
            width: 200px;
            height: 200px;

            // decoration
            border-radius: 15px;
            transform: translateY(-90%);
            transition: all .3s ease-in-out;
            cursor: inherit;

            a{
                position: absolute;
                left: 0;
                bottom: 0;
                img{
                    transform: translateY(-30%) translateX(30%);
                    transition: all .3s ease-in-out;
                }
            }
        }
    }
</style>