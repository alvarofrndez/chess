<script setup>
import {boardStore} from '@/stores/board.js'

const bs = boardStore();

bs.board = bs.createBoard()

// for(let line of bs.board){
//     let a = "";
//     for(let index in line){
//         a += "    " + bs.board.indexOf(line) + " " + index
//     }
//     console.log(a)
// }

setTimeout(() => {
    let pieces = document.getElementsByTagName('article')
    for(let piece of pieces){
        piece.addEventListener('drag', e => {
            console.log(e)
        })
        // piece.addEventListener('dragend', e => {
        //     console.log(e)
        // })
        // piece.addEventListener('dragleave', e => {
        //     console.log(e)
        // })
    }
}, 1000)

function elementClicked(piece, row, column){
    console.log(piece, row,column)
}
</script>

<template>
    <section>
        <div v-for="line of bs.board" :key="line">
            <!-- ver si hay alguna manera de hacer un in en vez de un for para poder poner claves primarias a cada pieza -->
            <article draggable="true" v-for="(value, index) in line" @click="() => elementClicked(value, bs.board.indexOf(line), index)" :key="bs.board.indexOf(line) + ' ' + index">{{ value }}</article>
        </div>
    </section>
</template>

<style scoped>
    section{
        width: 1000px;
        height: 1000px;
    }

    div{
        width: 100%;
        height: calc(100% / 8);
        display: flex;
    }

    article{
        border: 1px solid black;
        width: calc(100% / 8);
        height: 100%;
    }
</style>