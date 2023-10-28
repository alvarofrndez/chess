<script setup>
import {boardStore} from '@/stores/board.js'
import {pieceStore} from '@/stores/piece.js'

const bs = boardStore()
const ps = pieceStore()

bs.board = bs.createBoard()
let last_clicked = {
    piece: {type:undefined}
}
let last_move_type = 1
// pieza de prueba
// bs.board[5][1] = {
//     type: 1,
//     value:1,
//     color: 'white'
// }

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

function elementClicked(piece, row, column){
    console.log(piece.type, last_move_type, last_clicked.piece.type)
    // si la pieza que quiero mover es de tipo distinto al ultimo movimiento que se ha hecho
    if(piece.type != last_move_type){
        // si donde se ha hecho click no es una pieza si no un posible movimiento
        if(piece.posible_move == 'posible-move'){
            

                // la casilla de la pieza que quiero mover la igualo a una casilla vacía
                bs.board[last_clicked.row][last_clicked.column] = {
                type: 0,
                value: 0,
                color: last_clicked.piece.color,
                posible_move: '',
                img: ''
            }

            // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
            if(piece.color != last_clicked.piece.color){
                last_clicked.piece.color = piece.color
            }

            // muevo la pieza que quiero mover a la nueva posición
            bs.board[row][column] = last_clicked.piece

            // reseteo los posibles moviminetos
            resetPossibleMoves()

            // paso de turno cambiando el último tipo de movimiento que se ha hecho
            last_move_type = last_clicked.piece.type
        }else{
            // igualo la última pieza que se ha clickaado a la pieza recien clickada
            last_clicked = {
                piece: piece,
                row: row,
                column: column
            }

            // reseteo los posibles moviminetos
            resetPossibleMoves()

            // calculo los posibles movimientos de la nueva pieza
            let posibles_moves = ps.calculateMoves(piece, row,column)
            for(let move of posibles_moves){
                bs.board[move.row][move.column].posible_move = 'posible-move'
            }
        }
    }else{

        if(last_clicked.piece.type != piece.type){
            console.log('adsadasda ', piece.type, last_move_type, last_clicked.piece.type)
        }
    }

    function resetPossibleMoves(){
        for(let line of bs.board){
            for(let piece of line){
                piece.posible_move = ''
            }
        }
    }
}
</script>

<template>
    <section>
        <div v-for="line of bs.board" :key="line">
            <!-- ver si hay alguna manera de hacer un in en vez de un for para poder poner claves primarias a cada pieza -->
            <article draggable="true" v-for="(piece, index) in line" @click="() => elementClicked(piece, bs.board.indexOf(line), index)"  :class="piece.color + ' ' + piece.posible_move" :key="bs.board.indexOf(line) + ' ' + index">
                {{ piece.value }}
                <img v-if="piece.img != ''" :src="piece.img" alt="">
            </article>
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

    img{
        height: 100px;
        width: 100px;
    }

    .white{
        background-color: beige;
    }

    .brown{
        background-color: brown;
    }

    .posible-move{
        filter: brightness(0.4);
        /* background-color: rgba(162, 162, 162, 0.628); */
    }
</style>