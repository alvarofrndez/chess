<script setup>
import CardPlayerComponent from '../CardPlayerComponent.vue'
import ReflexComponent from '@/components/ReflexComponent.vue'
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
    <article v-if='props.type == 0 && !sk.expand' class='section-data player1'>
        <div v-if='!sk.game' class='new-game'>
            <button @click='sk.newGame' v-if='!sk.game'>
                Buscar partida
                <ReflexComponent/>
            </button>
            <button @click='sk.customGame' v-if='!sk.game'>
                Personalizada
                <ReflexComponent/>
            </button>
        </div>
        <CardPlayerComponent type='-1' v-else/>
    </article>
    <article v-if='props.type == 1 && !sk.expand' class='section-data player2'>
        <PersonalCardComponenet  v-if='!sk.game' class='player'/>
        <CardPlayerComponent type='1' v-else class='card'/>
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
                // size
                width: 100%;
                height: 100%;

                // position
                position: relative;

                // display
                @include flex(row, flex-end, flex-start);
                grid-row: 4 / 5;
                grid-column: 1 / 2;

                // margin
                padding: 15px;

                // decoration
                border: none;
                border-radius: 15px;
                cursor: pointer;
                background-color: $h-c-black;
                color: $h-c-white !important;
                scale: 1;

                // transition
                transition: all .1s ease;

                &:nth-child(2){
                    // display
                    grid-column: 2 / 3;

                    // decoration
                    background-color: $h-c-gray;
                    color: $h-c-black !important;
                }

                &:hover{
                    scale: 1.05;
                }
            }
        }
    }
</style>