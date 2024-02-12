<script setup>
    import { socketStore } from '@/stores/socket.js'
    import goToComponent from './goToComponent.vue';

    // stores
    const sk_s = socketStore()
</script>

<template>
    <div class='wrapper'>
        <div class='container'>
            <div class='title'>
                <h1>Juega contra {{ sk_s.online - 1}}</h1>
                <h1>jugadores</h1>
            </div>
            <div class='subtitle'>
                <goToComponent path='/play' name='jugar'/>
                <h3>gan asdfasd fas fasd</h3>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{

        // display
        @include flex();

        // decoration
        background-image: url('/src/assets/images/home-chess-tablero.png');
        background-position: center;
        background-size: fill;
        background-repeat: no-repeat;

        .container{
            // size
            width: calc(100% - 5rem);
            height: calc(100% - 5rem);

            // display
            @include flex(column, flex-start, space-between);

            .subtitle{
                // size
                width: 100%;
                
                // display
                @include simpleGrid(center, flex-end);
            }
        }
    }
</style>