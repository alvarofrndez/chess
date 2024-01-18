<script setup>
// import {ref} from 'vue'
import {socketStore} from '@/stores/socket';
import SearchingComponent from './SearchingComponent.vue'


const sk = socketStore()

// arrastar las piezas en vez de clickar
// setTimeout(() => {
//     let pieces = document.getElementsByTagName('article')
//     for(let piece of pieces){
//         piece.addEventListener('drag', e => {
//             console.log(e)
//         })
//         // piece.addEventListener('dragend', e => {
//         //     console.log(e)
//         // })
//         // piece.addEventListener('dragleave', e => {
//         //     console.log(e)
//         // })
//     }
// }, 1000)

</script>

<template>
    <div class='container' v-if='!sk.expand'>
        <section class='board' v-if='sk.game' :class="sk.match.player_type == 1 ? 'reverse' : ''">
            <div class='line' v-for='line of sk.bs.board' :key='line'>
                <article draggable='true' v-for='(piece, index) in line' @click="() => {if(sk.game){sk.elementClicked(piece, sk.bs.board.indexOf(line), index)}}"  :class="piece.color + ' ' + piece.possible_move" :key="sk.bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
        <section v-else class='board'>
            <div class='line' v-for='line of sk.bs.board' :key='line'>
                <article v-for='(piece, index) in line' :class="piece.color + ' ' + piece.possible_move" :key="sk.bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
        <SearchingComponent v-if='sk.searching' />
    </div>
    <div class='container' v-else>
        <section class='board expand'>
            <div class='line' v-for='line of sk.bs.board' :key='line'>
                <article v-for='(piece, index) in line' :class="piece.color + ' ' + piece.possible_move" :key="sk.bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/style.scss';
    .container{
        // display
        @include flex(column);

        .board{
            // size
            width: 70vh;
            height: 70vh;

            // decoration
            border: 25px solid $h-c-black;
            border-radius: 15px;

            .line{
                // size
                width: 100%;
                height: calc(100% / 8);

                // display
                @include flex();

                article{
                    // size
                    width: calc(100% / 8);
                    height: 100%;

                    // decoration
                    @include flex();

                    img{
                        // size
                        height: 60px;
                        width: 60px;

                        // decoration
                        cursor: pointer;
                    }
                }

                .white{
                    // decoration
                    background-color: $h-c-white;
                }

                .brown{
                    // decoration
                    background-color: $h-c-black;
                }

                .possible-move{
                    // decoration
                    filter: brightness(0.9);
                    opacity: .9;
                    background-image: linear-gradient(to right, rgba(200, 200, 200, .1), rgba(200, 200, 200, .1));;
                    cursor: pointer;
                }
            }
        }

        .expand{
            // size
            width: 80vh;
            height: 80vh;
        }

        .reverse{
            // transform
            transform: rotate(180deg);

            img{
                // transform
                transform: rotate(180deg);
            }
        }
    }
</style>