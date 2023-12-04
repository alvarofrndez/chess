<script setup>
// import {ref} from 'vue'
import {socketStore} from '@/stores/socket';

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
    <div class='container'>
        <section class='board' v-if='sk.game' :class="sk.player == 1 ? 'reverse' : ''">
            <div class='line' v-for='line of sk.bs.board' :key='line'>
                <article draggable='true' v-for='(piece, index) in line' @click="() => {if(sk.game){sk.elementClicked(piece, sk.bs.board.indexOf(line), index)}}"  :class="piece.color + ' ' + piece.possible_move" :key="sk.bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
        <section v-else>
            <div class='line' v-for='line of sk.bs.board' :key='line'>
                <article v-for='(piece, index) in line' :class="piece.color + ' ' + piece.possible_move" :key="sk.bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
        <div class='searching' v-if='sk.searching'>
            buscando
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/style.scss';
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        section{
            width: 80vh;
            height: 80vh;

            border: 25px solid $h-c-black;
            border-radius: 5px;
        }
    }

    

    .reverse{
        transform: rotate(180deg);
    }

    .line{
        width: 100%;
        height: calc(100% / 8);
        display: flex;
    }

    article{
        width: calc(100% / 8);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img{
        height: 60px;
        width: 60px;
        cursor: pointer;
    }

    .reverse img{
        transform: rotate(180deg) ;
    }

    .white{
        background-color: $h-c-white;
    }

    .brown{
        background-color: $h-c-black;
    }

    .possible-move{
        filter: brightness(0.9);
        opacity: .9;
        background-image: linear-gradient(to right, rgba(200, 200, 200, .1), rgba(200, 200, 200, .1));;
        cursor: pointer;
    }
</style>