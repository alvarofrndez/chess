<script setup></script>

<template>
    <section class='background'></section>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .background{
        // size
        width: 100%;
        height: 95%;

        // position
        position: absolute;
        // left: 25%;

        // decoration
        background-image: url('/src/assets/images/fondo-login.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;

        // animation
        // animation: move-background 10s linear infinite;

        @keyframes move-background {
            0% {
                left: 0;
            }
            50% {
                left: 74%;
            }
            100%{
                left: 0;
            }
        }
    }
</style>