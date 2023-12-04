<script setup>
import BoardComponent from '@/components/BoardComponent.vue';
import {socketStore} from '@/stores/socket';

const sk = socketStore()

</script>

<template>
    <section class='container-play'>
        <article class='game-data'>
            <h1>Turno de {{ sk.player_turn == 1 ? 'negras' : 'blancas' }}</h1>
            <button @click='sk.newGame' v-if='!sk.game'>Jugar de nuevo</button>
        </article>
        <BoardComponent class='board'></BoardComponent>
        <article class='other'></article>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .container-play{
        // size
        width: 100%;

        // display
        @include flex(row, center, center, 5rem);

        .game-data, .other{
            border: 1px solid black;
            // size
            width: 15%;
            height: 80vh;
        }

    }

</style>