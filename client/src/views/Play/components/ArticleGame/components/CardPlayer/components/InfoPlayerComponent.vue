<script setup>
    import { defineProps, ref } from 'vue'
    import { userStore } from '@/stores/user'
    import { socketStore } from '@/stores/socket'

    // stores
    const user_s = userStore()
    const sk_s = socketStore()

    // variables
    const { player } = defineProps(['player'])
    let total = ref(0)

    async function getPing(){
        total.value = await user_s.getPing()
    }

    setInterval( () => {
        getPing()
    }, 2000)

    console.log(player)
</script>

<template>
    <article v-if='user_s.user.id == player.id' class='wrapper'>
        <div class='data'>
            <div class='photo'>
                <img :src='player.photo' :alt="'foto de perfil de ' + player.username"> 
            </div>
            <div class='player-info'>
                <span>{{ player.username }}</span>
                <span>{{ total < 10 ? 'verde' : total < 30 ? 'amarillo' : 'rojo'}}</span>
            </div>
            <div class='moves'>
                <div class='timer'>
                    <p>{{sk_s.timer_white.time}}</p>
                </div>
                <span v-for='move of player.movements' :key='move.piece + move.row + move.column'>{{ move.piece.value }}</span>
            </div>
            <div class='pieces'></div>
        </div>

        <div class='container-options'>
            <button class='draw'>tablas</button>
            <button class='resigne'>rendirse</button>
        </div>
    </article>
    <article v-else class='wrapper'>
        <span>{{ player.username }}</span>
        <span><p>{{sk_s.timer_black.time}}</p></span>
        <span>{{ total < 10 ? 'verde' : total < 30 ? 'amarillo' : 'rojo'}}</span>
    </article>
</template>

<style lang='scss' scoped>
    @import '@/assets/style.scss';

    .wrapper{
        // size
        width: 80%;
        height: 80%;

        // display
        @include flex(column, center, space-between);

        .data{
            // size
            width: 100%;
            height: calc(80% - .5rem);

            // display
            @include grid(2,2,.5rem);
            .photo{
                // display
                @include flex();

                img{
                    // size
                    width:50px;
                    height:50px;

                    // decoration
                    border-radius: 50%;
                }
            }

            .player-info{

                // display
                @include flex(column);
            }

            .moves{
            }

            .player{
            }
        }

        .container-options{
            // size
            width: 100%;
            height: calc(20% - .5rem);

            // display
            @include flex(row, center, space-between);

            // decoration
            border-radius: 15px;

            .draw, .resigne{
                @include mainButton();
                // size
                width: calc(50% - 10px);
                height: calc(100% - 10px);

                // margin
                padding: 7.5px;

                // decoration
                border-radius: 10px;
            }
        }
    }
</style>