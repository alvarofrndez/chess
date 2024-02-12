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
        position: absolute;

        // display
        @include flex();

        // decoration
        background-color: $h-c-white-light;
        border-radius: 50%;
        transform: translateY(-50%);

        a{
            // size
            width: 100%;
            height: 100%;

            // display
            @include flex();

            img{
                // size
                width: 50%;
                height: 50%;

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
    }
</style>