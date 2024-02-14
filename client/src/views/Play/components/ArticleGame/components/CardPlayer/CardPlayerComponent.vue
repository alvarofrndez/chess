<script setup>
    import InfoPlayerComponent from './components/InfoPlayerComponent.vue';
    import { socketStore } from '@/stores/socket'

    // sotores
    const sk_s = socketStore()

    // props
    const props = defineProps(['type'])
</script>

<template>
    <section class='card' v-if='props.type == -1'>
        <InfoPlayerComponent :player='sk_s.match.player_white' />
    </section>
    <section class='card' v-else>
        <InfoPlayerComponent :player='sk_s.match.player_black' />
    </section>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .card{

    }
</style>