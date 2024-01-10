<script setup>
import {socketStore} from '@/stores/socket'

// sotores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <div class='card' v-if='props.type == -1'>
        <p>{{sk.timer_white.time}}</p>
        jugador data blancas
        <div class='options' v-if='sk.player == props.type'>
            rendirse
        </div>
    </div>
    <div class='card' v-else>
        <p>{{sk.timer_black.time}}</p>
        jugador data negras
        <div class='options' v-if='sk.player == props.type'>
            rendirse
        </div>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

</style>