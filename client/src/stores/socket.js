import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'
import {boardStore} from '@/stores/board'
import {pieceStore} from '@/stores/piece'
import {toastStore} from '@/stores/toast'
import {userStore} from '@/stores/user'

export const socketStore = defineStore('socket', () => {
    const bs = boardStore()
    const ps = pieceStore()
    const user = userStore()
    const toast = toastStore()

    let socket = undefined
    let message = {
        event: undefined,
        data: {}
    }
    let online = ref(0)
    let game = ref(false)
    let searching = ref(false)
    let expand = false
    let player = ref(undefined)

    bs.board = bs.createBoard()
    let last_clicked = {
        piece: {type:undefined}
    }
    let player_turn = ref(-1)
    let check = false
    let king_first_move = {
        white: true,
        black: true
    }
    let timer_white = ref({
        time: '',
        min: 10,
        sec: 0,
        mili: 0,
        turn: false,
        interval: undefined
    })
    let timer_black = ref({
        time: '',
        min: 10,
        sec: 0,
        mili: 0,
        turn: false,
        interval: undefined
    })

    let match = ref(
        {
            player_type: undefined,
            player_white: undefined,
            player_black: undefined
        }
    )

    function initSocket(){
        socket = io('ws://localhost:3000')

        socket.on('playerActivity', (message) => {
            online.value = message
        })

        socket.on('matchFind', (message) => {
            toast.show('partida encontrada', 'info')
            game.value = true
            searching.value = false
            match.value = message

            setTimer(-1)
        })

        socket.on('playerMove', message => {
            /*
            * cuando un oponente mueve se envia el tablero del oponente 
            * y se iguala el de este jugador a ese cambiando el turno
            */

            bs.board = message

            pauseTimer(player_turn.value)
            player_turn.value *= -1
        })
    }

    function searchGame(){
        searching.value = true

        message.event = 'newMatch'
        message.data.player = user

        sendMessage()
    }

    function setTimer(player){
        if(player == -1){
            timer_white.value.turn = true
            timer_black.value.turn = false
        }else{
            timer_white.value.turn = false
            timer_black.value.turn = true
        }

        if(timer_white.value.turn){
            timer_white.value.interval = setInterval(() => {
                if(timer_white.value.mili == 0 && timer_white.value.sec == 0&& timer_white.value.min == 0){
                    // ha perdido por tiempo
                    return
                }

                if(timer_white.value.sec == 0){
                    timer_white.value.sec = 59
                    timer_white.value.min--
                }else{
                    timer_white.value.sec--
                }

                timer_white.value.time = timer_white.value.min.toString() + ':' + timer_white.value.sec.toString() + ':' + timer_white.value.mili.toString()
            },1000)
        }else{
            timer_white.value.time = timer_white.value.min.toString() + ':' + timer_white.value.sec.toString() + ':' + timer_white.value.mili.toString()
        }
        if(timer_black.value.turn){
            timer_black.value.interval = setInterval(() => {
                if(timer_black.value.mili == 0 && timer_black.value.sec == 0&& timer_black.value.min == 0){
                    // ha perdido por tiempo
                    return
                }

                if(timer_black.value.sec == 0){
                    timer_black.value.sec = 59
                    timer_black.value.min--
                }else{
                    timer_black.value.sec--
                }

                timer_black.value.time = timer_black.value.min.toString() + ':' + timer_black.value.sec.toString() + ':' + timer_black.value.mili.toString()
            },1000)
        }else{
            timer_black.value.time = timer_black.value.min.toString() + ':' + timer_black.value.sec.toString() + ':' + timer_black.value.mili.toString()
        }
    }

    function pauseTimer() {
        // TODO: no para los contadores, corregir tmb el cambio
        if (timer_white.value.turn) {
            clearInterval(timer_white.value.interval)
            timer_white.value.interval = null
            setTimer(1)
        }else{
            clearInterval(timer_black.value.interval)
            timer_black.value.interval = null
            setTimer(-1)
        }
    }

    function cancelQueue(){
        toast.show('emparejamiento cancelado', 'success')

        searching.value = false

        message.event = 'cancelQueue'
        message.data.player = socket.id

        sendMessage()
    }

    function playerMove(){
        // TODO: no funciona la coronacion 
        message.event = 'playerMove'
        message.data = bs.board,

        pauseTimer()
        sendMessage()
    }

    function resetMessage(){
        message = {
            event: undefined,
            data: {}
        } 
    }

    function sendMessage(){
        socket.emit(message.event, message.data)

        resetMessage()
    }

    function newGame(){
        searchGame()
        // reinicia la partida
        bs.board = bs.createBoard()
        last_clicked = {
            piece: {type:undefined}
        }
        player_turn.value = -1
        check = false
    }

    function customGame(){

    }

    function addMovePlayer(row, column){
        if(match.value.player_type == '-1'){
            match.value.player_white.movements.push({
                piece: last_clicked.piece,
                row: row,
                column: column
            })
        }else if(match.value.player_type == '1'){
            match.value.player_black.movements.push({
                piece: last_clicked.piece,
                row: row,
                column: column
            })
        }
    }

    function addCapture(piece){
        if(match.value.player_type == '-1'){
            match.value.player_white.captures.push(piece)
        }else if(match.value.player_type == '1'){
            match.value.player_black.captures.push(piece)
        }
    }

    // FUNCIONALIDAD DEL TABLERO

    function elementClicked(piece, row, column){
        if(player_turn.value == match.value.player_type){
            // movimiento - compruebo si la pieza que se ha clickado es un posible movimiento
            if(piece.possible_move == 'possible-move'){
                // finalizar la partida
                if(piece.value == 6){
                    game.value = false
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
                    player_turn.value *= -1
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
    
                // notifico que se ha hecho un movimiento
                playerMove()

                // añado el movimiento a los movimientos del jugador
                addMovePlayer(row,column)

                // en caso de que capture una pieza la añado a las piezas capturadas
                if(piece.type == player_turn.value){
                    addCapture(piece)
                }
            }
            // selección - si la pieza que se ha pulsado es del tipo del jugador que mueve
            else if(player_turn.value == piece.type){
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
                player_turn.value *= -1
    
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
            player_turn.value *= -1
    
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
            player_turn.value *= -1
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

    return{online, game, searching, expand, player, bs, last_clicked, player_turn, king_first_move, check, timer_white, timer_black, match, searchGame, cancelQueue, playerMove, initSocket, elementClicked, newGame, customGame}
})