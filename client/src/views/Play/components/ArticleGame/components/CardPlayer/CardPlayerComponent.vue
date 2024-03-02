<script setup>
    import InfoPlayerComponent from './components/InfoPlayerComponent.vue';
    import { socketStore } from '@/stores/socket'

    // stores
    const sk_s = socketStore()

    // props
    const props = defineProps(['type'])
</script>

<template>
    <section class='card-player-game' v-if='props.type == -1'>
        <InfoPlayerComponent :player='sk_s.match.player_white' />
    </section>
    <section class='card-player-game card-player-game-dark' v-else>
        <InfoPlayerComponent :player='sk_s.match.player_black' />
    </section>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    .card-player-game{
        // size
        width: 100%;
        height: 100%;

        // display
        @include flex();

        // decoration
        border-radius: 30px;
        background-color: $h-c-gray;
    }

    .card-player-game-dark{
        // decoration
        background-color: $h-c-black;
        *{
            color: $h-c-white !important;
        }
    }
</style>