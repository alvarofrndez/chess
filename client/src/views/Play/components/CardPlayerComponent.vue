<script setup>
import {socketStore} from '@/stores/socket'

// sotores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <div class='card'>
        jugador data blancas
        <div class='options' v-if='sk.player == props.type'>
            rendirse
        </div>
    </div>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

</style>