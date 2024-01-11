<script setup>
import {socketStore} from '@/stores/socket'

// sotores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <section class='card' v-if='props.type == -1'>
        <div class='data'>
            <div class='photo'></div>
            <div class='player-info'></div>
            <div class='moves'>
                <div class='timer'>
                    <p>{{sk.timer_white.time}}</p>
                </div>
            </div>
            <div class='pieces'></div>
        </div>
        
        <div class='options' v-if='sk.player == props.type'>
            rendirse
        </div>
    </section>
    <section class='card' v-else>
        <p>{{sk.timer_black.time}}</p>
        jugador data negras
        <div class='options' v-if='sk.player == props.type'>
            rendirse
        </div>
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .card{

    }
</style>