<script setup>
import { socketStore } from '@/stores/socket'

// stores
const sk = socketStore()

</script>

<template>
    <div class='container-searching'>
        <div class='searching'></div>
        <button class='cancel' @click='sk.cancelQueue'>Cancelar</button>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-searching{
        // size
        width: 70vh;
        height: 70vh;

        // position
        position: absolute;

        // display
        @include flex(column);

        // margin
        margin: 0;

        // decoration
        background-color: $h-c-gray-transparent;
        border: 25px solid $h-c-gray-transparent;
        border-radius: 10px;

        .searching{
            @include loader-spiner();
        }

        .cancel{
            // size
            width: 100px;
            height: 50px;

            // display
            @include flex(row, flex-end, flex-start);
            
            // margin
            margin-top: 40px;
            padding-bottom: 5px;
            padding-left: 7.5px;
            
            // decoration
            border: none;
            border-radius: 15px;
            background-color: $h-c-gray;
            color: $h-c-black;
            cursor: pointer;

            // transition
            scale: 1;
            transition: scale .1s;

            &:hover{
                scale: 1.05;
            }
        }
    }
</style>