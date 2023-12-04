<script setup>
// import {ref} from 'vue'
import {boardStore} from '@/stores/board'
import {pieceStore} from '@/stores/piece'
import {socketStore} from '@/stores/socket';

const bs = boardStore()
const ps = pieceStore()
const sk = socketStore()

bs.board = bs.createBoard()
let last_clicked = {
    piece: {type:undefined}
}
let player_turn = -1
let check = false
let king_first_move = {
    white: true,
    black: true
}

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
    if(player_turn == sk.player){
        // movimiento - compruebo si la pieza que se ha clickado es un posible movimiento
        if(piece.possible_move == 'possible-move'){
            // finalizar la partida
            if(piece.value == 6){
                sk.game = false
                console.log('juego terminado')
            }

            // quitar si funciona la comprobacion de los movimientos ilegales en selectPiece
            if(isIlegal(piece, row, column))
                return

            // comprobar si se puede enroque
            if(!canCastling(piece, row, column)){
                // comprobar si es coronacion
                if(isCrowning(piece, row, column)){
                    return
                }

                // la casilla de la ultima pieza que se clicko que es la que quiero mover la igualo a una casilla vacía
                bs.board[last_clicked.row][last_clicked.column] = {
                    type: 0,
                    value: 0,
                    color: last_clicked.piece.color,
                    possible_move: '',
                    img: ''
                }

                // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
                if(piece.color != last_clicked.piece.color){
                    last_clicked.piece.color = piece.color
                }

                // muevo la pieza que quiero mover a la nueva posición
                bs.board[row][column] = last_clicked.piece

                // comprobrar si es el rey la que se ha movido
                if(last_clicked.piece.value == 6){
                    if(last_clicked.piece.type == -1){
                        king_first_move.white = false
                    }else if(last_clicked.piece.type == 1){
                        king_first_move.dark = false
                    }
                }

                // reseteo los posibles moviminetos
                resetPossibleMoves()

                // paso de turno cambiando el jugador que le toca mover
                player_turn *= -1
            }

            // comprobar si es jaque
            check = isCheck()

            if(checkSituation(last_clicked.piece, row, column)){
                if (check){
                    console.log('jaque mate')
                }else{
                    console.log('tablas')
                }
            }else{
                if(check)
                    console.log('jaque')
            }

            // envio al socket la pieza que se ha movido y ha donde se ha movido
            sk.playerMove(last_clicked, row, column)
        }
        // selección - si la pieza que se ha pulsado es del tipo del jugador que mueve
        else if(player_turn == piece.type){
            if(check)
                console.log('estas en jaque')
            selectPiece(piece, row, column)
        }
    }
}

function isIlegal(piece, row, column){
    let board_test = JSON.parse(JSON.stringify(bs.board))
    let last_clicked_test = JSON.parse(JSON.stringify(last_clicked))
    let piece_test = JSON.parse(JSON.stringify(piece));

    // la casilla de la ultima pieza que se clicko que es la que quiero mover la igualo a una casilla vacía
    board_test[last_clicked_test.row][last_clicked_test.column] = {
        type: 0,
        value: 0,
        color: last_clicked_test.piece.color,
        possible_move: '',
        img: ''
    }

    // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
    if(piece_test.color != last_clicked_test.piece.color){
        last_clicked_test.piece.color = piece_test.color
    }

    // muevo la pieza que quiero mover a la nueva posición
    board_test[row][column] = last_clicked_test.piece

    /* comprobando que piezas son las que tengo que comprobar si le estan haciando jaque,
    * si han movido las negras lo que hago es enviar el tipo de las blancas para que se 
    * compruebn todos los jaques que pueden hacer las blancas
    */
    let send_type = 0
    if(last_clicked_test.piece.type == 1){
        send_type = -1
    }else if(last_clicked_test.piece.type == -1){
        send_type = 1
    }

    if(isCheck(board_test, {piece:{type: send_type}})){
        return true
    }else{
        return false
    }
}

function selectPiece(piece, row, column){
    let can_move = false;

    // igualo la última pieza que se ha clickado a la pieza recien clickada
    last_clicked = {
        piece: piece,
        row: row,
        column: column
    }

    // reseteo los posibles moviminetos
    resetPossibleMoves()

    // calculo los posibles movimientos de la nueva pieza
    let posibles_moves = ps.calculateMoves(piece, row, column)
    for(let move of posibles_moves){
        // comprobar si el movimiento es ilegal
        if(!isIlegal(piece, move.row, move.column)){
            can_move = true
            bs.board[move.row][move.column].possible_move = 'possible-move'
        }
    }
    
    return can_move
}

function checkSituation(piece){
    // TODO: no comprueba bien todas las situaciones
    let game_over = true

    bs.board.forEach((line, i) => {
        line.forEach((celd, j) => {
            if(celd.type * -1 == piece.type){
                let can_move = false;

                let posibles_moves = ps.calculateMoves(celd, i, j)
                for(let move of posibles_moves){
                    // comprobar si el movimiento es ilegal
                    if(!isIlegal(celd, move.row, move.column)){
                        can_move = true
                    }
                }

                if(can_move){
                    game_over = false
                }
            }
        })
    })

    return game_over
}

function isCheck(board = bs.board, last_click = last_clicked){
    // el tipo de piezas que estan haciendo jaque
    let type = last_click.piece.type

    for(let line of board){
        for(let piece of line){
           if(piece.type == type){
                // todos los posibles movimientos de cada una de las piezas de ese tipo 
                let possible_moves = ps.calculateMoves(piece, board.indexOf(line), line.indexOf(piece), board)
                           
                for(const {row,column} of possible_moves){
                    // console.log(piece.value, row, column)
                    // si en los posibles movimientos se encuentra el rey de los otros
                    if(board[row][column].value == 6 && board[row][column].type != type){
                        // le estan ajciendo jaque
                        return true
                    }
                }
            }
        }
    }
    return false
}

function canCastling(piece, row, column){
    // TODO: mejorar codigo pasar al movimiento de la torre la fila y separarlo en otra funcion y el del rey hacer lo mismo
    // TODO: comprobar para cada torre si no se ha movido antes
    // TODO: la comprobacion del rey deberia hacerse en los posibles movimientos del enroque para que no se añada

    // compruebo que es la primera vez que se mueve el rey
    if((king_first_move.white && last_clicked.piece.type == -1) || (king_first_move.black && last_clicked.piece.type == 1)){
        if(last_clicked.piece.value == 6 && (last_clicked.row == 0 || last_clicked.row == 7) && last_clicked.column == 4 && (column == 2 || column == 6)){
            // la casilla de la ultima pieza que se clicko que es la que quiero mover la igualo a una casilla vacía
            bs.board[last_clicked.row][last_clicked.column] = {
                type: 0,
                value: 0,
                color: last_clicked.piece.color,
                possible_move: '',
                img: ''
            }

            // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
            if(piece.color != last_clicked.piece.color){
                last_clicked.piece.color = piece.color
            }

            // muevo la pieza que quiero mover a la nueva posición
            bs.board[row][column] = last_clicked.piece

            // comprobrar si es el rey la que se ha movido
            if(last_clicked.piece.type == -1){
                king_first_move.white = false
            }else if(last_clicked.piece.type == 1){
                king_first_move.dark = false
            }

            // movimiento de la torre
            if(row == 0){
                if(column == 2){
                    bs.board[0][0] = {
                        type: 0,
                        value: 0,
                        color: bs.board[0][0].color,
                        possible_move: '',
                        img: ''
                    }
                    bs.board[0][3] = {
                        type: last_clicked.piece.type,
                        value: 4,
                        possible_move: '',
                        img : 'src/assets/images/torre-negra.png',
                        color : bs.board[0][3].color
                    }
                }else if(column == 6){
                    bs.board[0][7] = {
                        type: 0,
                        value: 0,
                        color: bs.board[0][7].color,
                        possible_move: '',
                        img: ''
                    }
                    bs.board[0][5] = {
                        type: last_clicked.piece.type,
                        value: 4,
                        possible_move: '',
                        img : 'src/assets/images/torre-negra.png',
                        color : bs.board[0][5].color
                    }
                }
            }else if(row == 7){
                if(column == 2){
                    bs.board[7][0] = {
                        type: 0,
                        value: 0,
                        color: bs.board[7][0].color,
                        possible_move: '',
                        img: ''
                    }
                    bs.board[7][3] = {
                        type: last_clicked.piece.type,
                        value: 4,
                        possible_move: '',
                        img : 'src/assets/images/torre-blanca.png',
                        color : bs.board[7][3].color
                    }
                }else if(column == 6){
                    bs.board[7][7] = {
                        type: 0,
                        value: 0,
                        color: bs.board[7][7].color,
                        possible_move: '',
                        img: ''
                    }
                    bs.board[7][5] = {
                        type: last_clicked.piece.type,
                        value: 4,
                        possible_move: '',
                        img : 'src/assets/images/torre-blanca.png',
                        color : bs.board[7][5].color
                    }
                }
            }

            // reseteo los posibles moviminetos
            resetPossibleMoves()

            // paso de turno cambiando el jugador que le toca mover
            player_turn *= -1

            return true
        }
    }
    return false
}

function isCrowning(piece, row, column){
    // TODO: refactorizar el codigo en una funcion y meterla en store de piece
    if(last_clicked.value == 1){
        if(piece.type != last_clicked.piece.type && row == 0){
        // la casilla de la ultima pieza que se clicko que es la que quiero mover la igualo a una casilla vacía
        bs.board[last_clicked.row][last_clicked.column] = {
            type: 0,
            value: 0,
            color: last_clicked.piece.color,
            possible_move: '',
            img: ''
        }

        // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
        if(piece.color != last_clicked.piece.color){
            last_clicked.piece.color = piece.color
        }

        // muevo la pieza que quiero mover a la nueva posición y la convierto en dama
        bs.board[row][column] = {
            type: last_clicked.piece.type,
            value: 5,
            color: last_clicked.piece.color,
            possible_move: '',
            img: 'src/assets/images/reina-blanca.png'
        }

        // reseteo los posibles moviminetos
        resetPossibleMoves()

        // paso de turno cambiando el jugador que le toca mover
        player_turn *= -1

        return true
    }else if(piece.type != last_clicked.piece.type && row == 7){
        console.log(last_clicked.piece)
        // la casilla de la ultima pieza que se clicko que es la que quiero mover la igualo a una casilla vacía
        bs.board[last_clicked.row][last_clicked.column] = {
            type: 0,
            value: 0,
            color: last_clicked.piece.color,
            possible_move: '',
            img: ''
        }

        // si a donde quiero mover la pieza tiene un color de fondo distinto al de la pieza que quiero mover
        if(piece.color != last_clicked.piece.color){
            last_clicked.piece.color = piece.color
        }

        // muevo la pieza que quiero mover a la nueva posición y la convierto en dama
        bs.board[row][column] = {
            type: last_clicked.piece.type,
            value: 5,
            color: last_clicked.piece.color,
            possible_move: '',
            img: 'src/assets/images/reina-negra.png'
        }

        // reseteo los posibles moviminetos
        resetPossibleMoves()

        // paso de turno cambiando el jugador que le toca mover
        player_turn *= -1
        return true
    }
    }
    return false
}

function resetPossibleMoves(){
    for(let line of bs.board){
        for(let piece of line){
            piece.possible_move = ''
        }
    }
}

function newGame(){
    sk.searchGame()
    // reinicia la partida
    bs.board = bs.createBoard()
    last_clicked = {
        piece: {type:undefined}
    }
    player_turn = -1
    check = false
}

</script>

<template>
    <div class='container'>
        <h1>Turno de {{ player_turn == 1 ? 'negras' : 'blancas' }}</h1>
        <button @click='newGame'>Jugar de nuevo</button>
        <section class='board' v-if='sk.game' :class="sk.player == 1 ? 'reverse' : ''">
            <div class='line' v-for='line of bs.board' :key='line'>
                <article draggable='true' v-for='(piece, index) in line' @click="() => {if(sk.game){elementClicked(piece, bs.board.indexOf(line), index)}}"  :class="piece.color + ' ' + piece.possible_move" :key="bs.board.indexOf(line) + ' ' + index">
                    <img v-if="piece.img != ''" :src='piece.img' alt=''>
                </article>
            </div>
        </section>
        <div class='searching' v-if='sk.searching'>
            buscando
        </div>
    </div>
</template>

<style scoped>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    section{
        width: 600px;
        height: 600px;
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
        border: 1px solid black;
        width: calc(100% / 8);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img{
        height: 60px;
        width: 60px;
    }

    .reverse img{
        transform: rotate(180deg) ;
    }

    .white{
        background-color: beige;
    }

    .brown{
        background-color: brown;
    }

    .possible-move{
        filter: brightness(0.4);
        /* background-color: rgba(162, 162, 162, 0.628); */
    }
</style>