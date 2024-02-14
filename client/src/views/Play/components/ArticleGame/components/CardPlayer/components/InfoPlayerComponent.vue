<script setup>
    import { defineProps } from 'vue'
    import { userStore } from '@/stores/user'
    import { socketStore } from '@/stores/socket'

    // stores
    const user_s = userStore()
    const sk_s = socketStore()

    // variables
    const { player } = defineProps(['player'])
</script>

<template>
    <article v-if='user_s.user.id == player.id' class='wrapper'>
        <div class='data'>
            <div class='photo'>
                <img :src='player.photo' :alt="'foto de perfil de ' + player.username"> 
            </div>
            <div class='player-info'>
                {{ player.username }}
            </div>
            <div class='moves'>
                <div class='timer'>
                    <p>{{sk_s.timer_white.time}}</p>
                </div>
            </div>
            <div class='pieces'></div>
        </div>

        <div class='options'>
            rendirse
        </div>
    </article>
    <article v-else>
        {{ player.username }}
    </article>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';
</style>