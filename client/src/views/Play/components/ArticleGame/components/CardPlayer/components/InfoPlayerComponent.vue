<script setup>
    import { defineProps } from 'vue'
    import { userStore } from '@/stores/user'
    import { socketStore } from '@/stores/socket'

    // stores
    const user_s = userStore()
    const sk_s = socketStore()

    // variables
    // TODO: no se como cojones acceder a los datos de la variable player
    const player = defineProps(['player'])
    console.log(player)
</script>

<template>
    <article v-if='user_s.user.id == player.id'>
        <div class='data'>
            <div class='photo'>
                <img :src='player.photo' :alt="'foto de perfil de ' + sk.match.player_white.username"> 
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