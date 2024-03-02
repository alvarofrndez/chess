<script setup>
import CardPlayerComponent from './components/CardPlayer/CardPlayerComponent.vue'
import PersonalCardComponenet from '@/components/PersonalCardComponenet.vue'
import { socketStore } from '@/stores/socket'

// stores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <img v-if='sk.game && !sk.expand' @click='sk.expand = true' src='src/assets/images/expand.svg' class='expand'/>
    <img v-if='sk.game && sk.expand' @click='sk.expand = false' src='src/assets/images/minimize.svg' class='expand'/>
    <article v-if='props.type == -1 && !sk.expand' class='section-data player1'>
        <div v-if='!sk.game' class='new-game'>
            <button @click='sk.newGame' v-if='!sk.game'>
                Buscar partida
            </button>
            <button @click='sk.customGame' v-if='!sk.game'>
                Personalizada
            </button>
        </div>
        <CardPlayerComponent :type='props.type' v-else/>
    </article>
    <article v-if='props.type == 1 && !sk.expand' class='section-data player2'>
        <PersonalCardComponenet  v-if='!sk.game' class='player'/>
        <CardPlayerComponent :type='props.type' v-else class='card'/>
    </article>
</template>

<style scoped lang='scss'>
    @import '@/assets/style.scss';

    .expand{
        // size
        width: 30px;
        height: 30px;

        // position
        position: absolute;
        top: 30px;
        right: 30px;

        // decoration
        cursor: pointer;
    }

    .section-data{
        // size
        width: 20%;
        height: 40vh;

        // display
        @include flex(column);
        .new-game{
            // size
            width: 100%;
            height: 100%;

            // display
            @include grid(4, 2, .5rem);

            button{
                @include mainButton();

                // margin
                padding: 15px;

                // display
                grid-row: 4 / 5;
                grid-column: 1 / 2;

                &:nth-child(2){
                    // display
                    grid-column: 2 / 3;

                    // decoration
                    background-color: $h-c-gray;
                    color: $h-c-black !important;
                }
            }
        }
    }
</style>