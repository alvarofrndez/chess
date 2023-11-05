import { defineStore } from 'pinia'
import { boardStore } from '@/stores/board';

export const pieceStore = defineStore('piece', () => {
    const bs = boardStore()

    function calculateMoves(piece, row, column, board = bs.board){
        let possible_moves = []

        if(piece.value == 1){
            possible_moves = pawnMoves(piece, row, column, board)
        }else if(piece.value == 4){
            possible_moves = towerMoves(piece, row, column, board)
        }else if(piece.value == 3){
            possible_moves = horseMoves(piece, row, column, board)
        }else if(piece.value == 2){
            possible_moves = bishopMoves(piece, row, column, board)
        }else if(piece.value == 5){
            possible_moves = queenMoves(piece, row, column, board)
        }else if(piece.value == 6){
            possible_moves = kingMoves(piece, row, column, board)
        }

        return possible_moves
    }

    function pawnMoves(piece, row, column, board){
        let possible_moves = []

        let initial = false
        let can_pass = false

        // salida
        if((piece.type == -1 && row == 6) || (piece.type == 1 && row == 1)){
            initial = true
        }

        // uno hacia alante
        if(board[row + piece.type][column].value == 0){
            if(operationOnIndex(row + piece.type)){
                can_pass = true
                possible_moves.push({
                    row: row + piece.type,
                    column: column
                })
            }
        }

        // dos hacia alante solo en salida
        if(initial){
            if(board[row + piece.type * 2][column].value == 0 && can_pass){
                if(operationOnIndex(row + piece.type * 2)){
                    possible_moves.push({
                        row: row + piece.type * 2,
                        column: column
                    })
                }
            }
        }
        
        // captura izquierda
        if(operationOnIndex(row + piece.type) && operationOnIndex(column - 1)){
            if(board[row + piece.type][column - 1].type * -1 == piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column - 1
                })
            }
        }

        // captura derecha
        if(operationOnIndex(row + piece.type) && operationOnIndex(column + 1)){
            if(board[row + piece.type][column + 1].type * -1 == piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column + 1
                })
            }
        }

        return possible_moves
    }

    function towerMoves(piece, row, column, board){
        let possible_moves = []

        // izquierda
        findMovesInDirection(row, column, -1, 0, board, piece, possible_moves)

        // derecha
        findMovesInDirection(row, column, 1, 0, board, piece, possible_moves)

        // arriba
        findMovesInDirection(row, column, 0, -1, board, piece, possible_moves)

        // abajo
        findMovesInDirection(row, column, 0, 1, board, piece, possible_moves)

        return possible_moves
    }

    function horseMoves(piece, row, column, board){
        let possible_moves = []

        const horse_moves = [
            { row: -2, column: -1 },
            { row: -2, column: 1 },
            { row: -1, column: -2 },
            { row: -1, column: 2 },
            { row: 1, column: -2 },
            { row: 1, column: 2 },
            { row: 2, column: -1 },
            { row: 2, column: 1 },
        ];
    
        for (let move of horse_moves) {
            const new_row = row + move.row
            const new_column = column + move.column

            // si el movimiento está dentro del tablero
            if(operationOnIndex(new_row) && operationOnIndex(new_column))
                addMove(new_row, new_column, possible_moves, piece, board)
        } 
        
        return possible_moves
    }

    function bishopMoves(piece, row, column, board){
        let possible_moves = []

        // arriba izquierda
        findMovesInDirection(row, column, -1, -1, board, piece, possible_moves)

        // arriba derecha
        findMovesInDirection(row, column, -1, 1, board, piece, possible_moves)

        // abajo izquierda
        findMovesInDirection(row, column, 1, -1, board, piece, possible_moves)

        // abajo derecha
        findMovesInDirection(row, column, 1, 1, board, piece, possible_moves)

        return possible_moves
    }

    function queenMoves(piece, row, column, board){
        let possible_moves = []

        // lógica de las torres para los movimientos rectos
        possible_moves.push(towerMoves(piece, row, column, board))

        // lógica de los alfiles para los movimientos diagonales
        possible_moves.push(bishopMoves(piece, row, column, board))

        // aplanar el array
        possible_moves = possible_moves.flat()

        return possible_moves
    }

    function kingMoves(piece, row, column, board){
        let possible_moves = []

        const king_moves = [
            { row: 1, column : 0},
            { row: -1, column : 0},
            { row: 0, column : 1},
            { row: 0, column : -1},
            { row: 1, column : 1},
            { row: 1, column : -1},
            { row: -1, column : 1},
            { row: -1, column : -1},
        ]

        for(let move of king_moves){
            const new_row = row + move.row
            const new_column = column + move.column

            if(operationOnIndex(new_row) && operationOnIndex(new_column))
                addMove(new_row, new_column, possible_moves, piece, board)
        }

        possible_moves.push(canCastling(piece, row, column, board))
        possible_moves = possible_moves.flat()

        return possible_moves
    }

    function canCastling(piece, row, column, board){
        let possible_moves = []

        if(piece.type == 1){
            possible_moves.push(castlingMoves(piece, row, column, 0, board))
        }else if(piece.type == -1){
            possible_moves.push(castlingMoves(piece, row, column, 7, board))
        }

        possible_moves = possible_moves.flat()
        return possible_moves
    }

    function castlingMoves(piece, row, column, player, board){
        let possible_moves = []

        if(row == player && column == 4){
            let left = true
            let rigth = true

            if(board[player][0].value == 4 && board[player][0].type == piece.type){
                for(let j = 3; j > 0; j--){
                    if(board[player][j].type != 0){
                        left = false
                    }
                }
            }else{
                left = false
            }


            if(board[player][7].value == 4 && board[player][7].type == piece.type){
                for(let j = 5; j < 7; j++){
                    if(board[player][j].type != 0){
                        rigth = false
                    }
                }
            }else{
                rigth = false
            }

            if(left){
                possible_moves.push({
                    row: player,
                    column: 2
                })
            }

            if(rigth){
                possible_moves.push({
                    row: player,
                    column: 6
                })
            }
        }

        return possible_moves
    }

    function findMovesInDirection(row, column, row_increment, column_increment, board, piece, possible_moves){
        // cada posicion en una dirección sin salir del tablero
        for(let i = row + row_increment, j = column + column_increment; i >= 0 && i <= 7 && j >= 0 && j <= 7; i += row_increment, j += column_increment){
            if(addPosibleMove(i, j, board, piece, possible_moves))
                break;
        }
    }

    function addPosibleMove(i, j, board, piece, possible_moves){
        // si es una casilla vacia o hay una pieza del rival
        if( board[i][j].type == 0){
            possible_moves.push({ row: i, column: j });
        }else if( board[i][j].type != piece.type){
            possible_moves.push({ row: i, column: j });
            return true
        }else{
            return true
        }

        return false
    }

    function addMove(row, column, possible_moves, piece, board) {
        // TODO: quitar esta funcion y utilizar solo la de arriba
        // si el tipo de la piza es distinto al que mueve 
        if (board[row][column].type !== piece.type) {
            possible_moves.push({
                row: row,
                column: column
            })
        }
    }

    function operationOnIndex(operation){
        // comprueba si una operacion se sale de los límites del board
        if(operation >= 0 && operation <= 7){
            return true
        }
        return false
    }

    return {calculateMoves}
}) 