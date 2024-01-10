<script setup>
import { toastStore } from '@/stores/toast.js'

// stores
const toast = toastStore()
</script>

<template>
    <div class='container-toast'>
        <div class='toast'>
            <img :src=" 'src/assets/images/' + toast.icon + '.svg'"/>
            <span>{{ toast.text }}</span>
        </div>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-toast{
        // size
        width: 250px;
        height: 70px;

        // position
        position: absolute;
        top: 10px;
        z-index: 9999;

        // display
        @include flex();

        // decoration
        border-radius: 10px;
        background-color: $h-c-white;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

        // animation
        animation: toast 3s ease-in-out forwards;

        @keyframes toast{
            0%{
                opacity: 0;
                transform: translateY(-100%);
            }
            25%{
                opacity: 1;
                transform: translateY(0);
            }
            75%{
                opacity: 1;
                transform: translateY(0);
            }
            100%{
                opacity: 0;
                transform: translateY(-100%);
            }
        }

        .toast{
            // size
            width: 80%;
            height: 80%;

            // display
            @include flex(row, center, flex-start, 30px);
            
            // decoration
            overflow: hidden;

            img{
                // size
                width: 30px;
                height: 30px;
            }

            span{
                // size
                width: fit-content;

                // decoration
                text-align: start;
            }
        }
    }
</style>