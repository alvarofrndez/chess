<script setup>
    import { defineProps, ref } from 'vue'
    import { userStore } from '@/stores/user'
    import { socketStore } from '@/stores/socket'
    import PlayerMoveComponent from './PlayerMoveComponent.vue'
    import CaptureComponent from './CaptureComponent.vue'

    // stores
    const user_s = userStore()
    const sk_s = socketStore()

    // variables
    const { player, type } = defineProps(['player', 'type'])
    let total = ref(0)

    async function getPing(){
        total.value = await user_s.getPing()
    }

    setInterval( () => {
        getPing()
    }, 2000)
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
            <div class='container-pieces'>
                <div class='timer'>
                    <p v-if='type == -1'>{{sk_s.timer_white.time}}</p>
                    <p v-else>{{sk_s.timer_black.time}}</p>
                </div>
                <ul class='captures'>
                    <CaptureComponent v-for='capture of player.captures' :key='capture.value + capture.color' :capture='capture'/>
                </ul>
            </div>
            <div class='container-moves'>
                <ul class='moves'>
                    <PlayerMoveComponent v-for='move of player.movements' :key='move.piece.value + move.row + move.column' :move='move'/>
                </ul>
            </div>
        </div>

        <div class='container-options'>
            <button class='draw'>tablas</button>
            <button class='resigne' @click='sk_s.resigne'>rendirse</button>
        </div>
    </article>
    <article v-else class='wrapper'>
        <span>{{ player.username }}</span>
        <p v-if='type == -1'>{{sk_s.timer_white.time}}</p>
        <p v-else>{{sk_s.timer_black.time}}</p>
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

            .container-pieces{
                // display
                @include flex(column);

                .captures{
                    // size
                    width: 100%;
                    height: 80%;

                    // margin
                    padding: 0;
                    margin: 0;

                    // display
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;

                    // decoration
                    list-style: none;
                    overflow-x: scroll;
                }
            }

            .container-moves{
                // display
                @include flex(column);

                // decoration
                overflow: hidden;

                .moves{
                    // size
                    width: 100%;
                    height: 80%;

                    // margin
                    padding: 0;
                    margin: 0;

                    // display
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;

                    // decoration
                    list-style: none;
                    overflow-x: scroll;
                }
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