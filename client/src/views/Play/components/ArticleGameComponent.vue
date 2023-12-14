<script setup>
import CardPlayerComponent from './CardPlayerComponent.vue';
import ReflexComponent from '@/components/ReflexComponent.vue';
import PersonalCardComponenet from '@/components/PersonalCardComponenet.vue';
import {socketStore} from '@/stores/socket'

// stores
const sk = socketStore()

// props
const props = defineProps(['type'])
</script>

<template>
    <article v-if='props.type == 0' class='section-data player1'>
        <div v-if='!sk.game' class='new_game'>
            <button @click='sk.newGame' v-if='!sk.game'>
                Buscar partida
                <ReflexComponent/>
            </button>
            <button @click='sk.customGame' v-if='!sk.game'>
                Personalizada
                <ReflexComponent/>
            </button>
            <div class="a">a</div>
            <div class="b">b</div>
            <div class="c">c</div>
        </div>
        <CardPlayerComponent type='-1' v-else/>
    </article>
    <article v-else class='section-data player2'>
        <PersonalCardComponenet  v-if='!sk.game' class='player'/>
        <CardPlayerComponent type='1' v-else class='card'/>
    </article>
</template>

<style lang='scss'>
    @import '@/assets/style.scss';

    .section-data{
        // size
        width: 20%;
        height: 40vh;

        // display
        @include flex(column);
        .new_game{
            // size
            width: 100%;
            height: 100%;

            // display
            @include grid(4, 2, .5rem);

            .a, .b, .c, .d{
                // display
                @include flex();

                // decoration
                background-color: $h-c-black;
                border-radius: 15px;
            }

            .a{
                grid-row: 1 / 2;
                grid-column: 1 / 3;
            }

            .b{
                grid-row: 2 / 4;
                grid-column: 1 / 2;
            }

            .c{
                grid-row: 2 / 3;
                grid-column: 2 / 3;
            }

            .d{
                grid-row: 3 / 4;
                grid-column: 2 / 3;
            }

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

                &:nth-child(2){
                    // display
                    grid-column: 2 / 3;

                    // decoration
                    background-color: $h-c-gray;
                    color: $h-c-black !important;
                }

                &:hover .reflex{
                    background-position: right center;
                    color: #fff;
                    text-decoration: none;
                }

                &:active .reflex{
                    transform: scale(0.95);
                }
            }
        }
    }
</style>