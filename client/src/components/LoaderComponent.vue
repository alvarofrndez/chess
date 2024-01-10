<script setup>
</script>

<template>
    <div class='loader-contianer'>
        <div class='loader'></div>
    </div>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    .loader-contianer{
        // size
        width: 100vw;
        height: 100vh;

        // position
        position: absolute;

        // display
        @include flex();

        // margin
        margin: 0;

        // decoration
        background-color: $h-c-gray-transparent;

        .loader{
            @include loader-spiner();
        }
    }
</style>