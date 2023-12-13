<script setup>
import CardPlayerComponent from './CardPlayerComponent.vue';
import {socketStore} from '@/stores/socket'

// sotores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <article v-if='props.type == 0' class='section-data player1'>
        <div v-if='!sk.game' class='new_game'>
            <h1>Turno de {{ sk.player_turn == 1 ? 'negras' : 'blancas' }}</h1>
            <button @click='sk.newGame' v-if='!sk.game'>Jugar de nuevo</button>
        </div>
        
        <CardPlayerComponent type='-1' v-else/>
    </article>
    <article v-else class='section-data player2'>
        <div  v-if='!sk.game' class='player'>
            informacion personal
        </div>
        
        <CardPlayerComponent type='1' v-else class='card'/>
    </article>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .section-data{
        border: 1px solid black;
        // size
        width: 15%;
        height: 80vh;
    }
</style>