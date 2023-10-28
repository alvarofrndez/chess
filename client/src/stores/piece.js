import { defineStore } from 'pinia'
import { boardStore } from '@/stores/board';

export const pieceStore = defineStore('piece', () => {
    const bs = boardStore()

    function calculateMoves(piece, row, column){
        // console.log('piece ', piece.type, row, column)
        let possible_moves = []

        // logica de peón con captura, no coronación
        if(piece.value == 1){
            possible_moves = pawnMoves(piece, row, column)
        }else if(piece.value == 4){
            possible_moves = towerMoves(piece, row, column)
        }else if(piece.value == 3){
            possible_moves = horseMoves(piece, row, column)
        }else if(piece.value == 2){
            possible_moves = bishopMoves(piece, row, column)
        }else if(piece.value == 5){
            possible_moves = queenMoves(piece, row, column)
        }else if(piece.value == 6){
            possible_moves = kingMoves(piece, row, column)
        }

        return possible_moves
    }

    function pawnMoves(piece, row, column){
        let possible_moves = []

        // TODO: coronacion, cambiar la pieza a reina(5)
        let initial = false
        let can_pass = false

        // salida
        if((piece.type == -1 && row == 6) || (piece.type == 1 && row == 1)){
            initial = true
        }


        // uno hacia alante
        if(bs.board[row + piece.type][column].value == 0){
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
            if(bs.board[row + piece.type * 2][column].value == 0 && can_pass){
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
            if(bs.board[row + piece.type][column - 1].type * -1 == piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column - 1
                })
            }
        }

        // captura derecha
        if(operationOnIndex(row + piece.type) && operationOnIndex(column + 1)){
            if(bs.board[row + piece.type][column + 1].type * -1 == piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column + 1
                })
            }
        }

        return possible_moves
    }

    function towerMoves(piece, row, column){
        // TODO: refactorizar el codigo ya que es un for muy repetitivo y se puede juntar minimo en dos
        let possible_moves = []

        for(let i = row - 1, j = row + 1; i >= 0 || j <=7; i--, j++){
            if(i>=0){
                if(bs.board[i][column].type == 0){
                    possible_moves.push({
                        row: i,
                        column: column
                    })
                }else if(bs.board[i][column].type != piece.type){
                    possible_moves.push({
                        row: i,
                        column: column
                    })
                    i = -1
                }else{
                    i = -1
                }
            }
            if(j<=7){
                if(bs.board[j][column].type == 0){
                    possible_moves.push({
                        row: j,
                        column: column
                    })
                }else if(bs.board[j][column].type != piece.type){
                    possible_moves.push({
                        row: j,
                        column: column
                    })
                    j = 8
                }else{
                    j = 8
                }
            }
        }

        for(let i = column - 1, j = column + 1; i >= 0 || j <=7; i--, j++){
            if(i>=0){
                if(bs.board[row][i].type == 0){
                    possible_moves.push({
                        row: row,
                        column: i
                    })
                }else if(bs.board[row][i].type != piece.type){
                    possible_moves.push({
                        row: row,
                        column: i
                    })
                    i = -1
                }else{
                    i = -1
                }
            }
            if(j<=7){
                if(bs.board[row][j].type == 0){
                    possible_moves.push({
                        row: row,
                        column: j
                    })
                }else if(bs.board[row][j].type != piece.type){
                    possible_moves.push({
                        row: row,
                        column: j
                    })
                    j = 8
                }else{
                    j = 8
                }
            }
        }

        return possible_moves
    }

    function horseMoves(piece, row, column){
        let possible_moves = []

        // las filas * 2
        if(operationOnIndex(row + piece.type * 2) && operationOnIndex(column + piece.type)){
            if(bs.board[row + piece.type * 2][column + piece.type].type != piece.type){
                possible_moves.push({
                    row: row + piece.type * 2,
                    column: column + piece.type
                })
            }
        }
        
        if(operationOnIndex(row - piece.type * 2) && operationOnIndex(column + piece.type)){
            if(bs.board[row - piece.type * 2][column + piece.type].type != piece.type){
                possible_moves.push({
                    row: row - piece.type * 2,
                    column: column + piece.type
                })
            }
        }
        
        if(operationOnIndex(row + piece.type * 2) && operationOnIndex(column - piece.type)){
            if(bs.board[row + piece.type * 2][column - piece.type].type != piece.type){
                possible_moves.push({
                    row: row + piece.type * 2,
                    column: column - piece.type
                })
            }
        }
        
        if(operationOnIndex(row - piece.type * 2) && (operationOnIndex(column - piece.type))){
            if(bs.board[row - piece.type * 2][column - piece.type].type != piece.type){
                possible_moves.push({
                    row: row - piece.type * 2,
                    column: column - piece.type
                })
            }
        }


        // las columnas * 2
        if(operationOnIndex(row + piece.type) && operationOnIndex(column + piece.type * 2)){
            if(bs.board[row + piece.type][column + piece.type * 2].type != piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column + piece.type * 2
                })
            }
        }
        
        if(operationOnIndex(row - piece.type) && operationOnIndex(column + piece.type * 2)){
            if(bs.board[row - piece.type][column + piece.type * 2].type != piece.type){
                possible_moves.push({
                    row: row - piece.type,
                    column: column + piece.type * 2
                })
            }
        }
        
        if(operationOnIndex(row + piece.type) && operationOnIndex(column - piece.type * 2)){
            if(bs.board[row + piece.type][column - piece.type * 2].type != piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column - piece.type * 2
                })
            }
        }
        
        if(operationOnIndex(row - piece.type) && (operationOnIndex(column - piece.type * 2))){
            if(bs.board[row - piece.type][column - piece.type * 2].type != piece.type){
                possible_moves.push({
                    row: row - piece.type,
                    column: column - piece.type * 2
                })
            }
        }


        return possible_moves
    }

    function bishopMoves(piece, row, column){
        // TODO: mejorar los for igual que en las torres
        let possible_moves = []

        // arriba derecha
        for(let i = row - 1, j = column + 1; i >= 0 || j <= 7; i--, j++){
            if(i >= 0 && j <= 7){
                if(bs.board[i][j].value == 0){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                }else if(bs.board[i][j].type != piece.type){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                    i = -1
                }else{
                    i = -1
                }
            }
        }

        // arriba izquierda
        for(let i = row - 1, j = column - 1; i >= 0 || j >= 0; i--, j--){
            if(i >= 0 && j >= 0){
                if(bs.board[i][j].value == 0){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                }else if(bs.board[i][j].type != piece.type){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                    i = -1
                }else{
                    i = -1
                }
            }
        }

        // abajo izquierda
        for(let i = row + 1, j = column - 1; i <= 7 || j >= 0; i++, j--){
            if(i <= 7 && j >= 0){
                if(bs.board[i][j].value == 0){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                }else if(bs.board[i][j].type != piece.type){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                    i = 8
                }else{
                    i = 8
                }
            }
        }

        // abajo derecha
        for(let i = row + 1, j = column + 1; i <= 7 || j <= 7; i++, j++){
            if(i <= 7 && j <= 7){
                if(bs.board[i][j].value == 0){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                }else if(bs.board[i][j].type != piece.type){
                    possible_moves.push({
                        row: i,
                        column: j
                    })
                    i = 8
                }else{
                    i = 8
                }
            }
        }

        return possible_moves
    }

    function queenMoves(piece, row, column){
        let possible_moves = []

        // lógica de las torres para los movimientos rectos
        possible_moves.push(towerMoves(piece, row, column))

        // lógica de los alfiles para los movimientos diagonales
        possible_moves.push(bishopMoves(piece, row, column))

        // aplanar el array
        possible_moves = possible_moves.flat()

        return possible_moves
    }

    function kingMoves(piece, row, column){
        // TODO: mejorar la lógica
        let possible_moves = []

        possible_moves.push(canCastling(piece, row, column))
        possible_moves = possible_moves.flat()

        // rectos
        if(operationOnIndex(row + piece.type)){
            if(bs.board[row + piece.type][column].type != piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column
                })
            }
        }
        
        if(operationOnIndex(row - piece.type)){
            if(bs.board[row - piece.type][column].type != piece.type){
                possible_moves.push({
                    row: row - piece.type,
                    column: column
                })
            }
        }
        
        if(operationOnIndex(column + piece.type)){
            if(bs.board[row][column + piece.type].type != piece.type){
                possible_moves.push({
                    row: row,
                    column: column + piece.type
                })
            }
        }

        if(operationOnIndex(column - piece.type)){
            if(bs.board[row][column - piece.type].type != piece.type){
                possible_moves.push({
                    row: row,
                    column: column - piece.type
                })
            }
        }


        // diagonales
        if(operationOnIndex(row + piece.type) && operationOnIndex(column + piece.type)){
            if(bs.board[row + piece.type][column + piece.type].type != piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column + piece.type
                })
            }
        }

        if(operationOnIndex(row + piece.type) && operationOnIndex(column - piece.type)){
            if(bs.board[row + piece.type][column - piece.type].type != piece.type){
                possible_moves.push({
                    row: row + piece.type,
                    column: column - piece.type
                })
            }
        }

        if(operationOnIndex(row - piece.type) && operationOnIndex(column - piece.type)){
            if(bs.board[row - piece.type][column - piece.type].type != piece.type){
                possible_moves.push({
                    row: row - piece.type,
                    column: column - piece.type
                })
            }
        }

        if(operationOnIndex(row - piece.type) && operationOnIndex(column + piece.type)){
            if(bs.board[row - piece.type][column + piece.type].type != piece.type){
                possible_moves.push({
                    row: row - piece.type,
                    column: column + piece.type
                })
            }
        }

        return possible_moves
    }

    function canCastling(piece, row, column){
        let possible_moves = []

        if(piece.type == 1){
            possible_moves.push(castlingMoves(piece, row, column, 0))
        }else if(piece.type == -1){
            possible_moves.push(castlingMoves(piece, row, column, 7))
        }

        possible_moves = possible_moves.flat()
        return possible_moves
    }

    function castlingMoves(piece, row, column, player){
        let possible_moves = []

        if(row == player && column == 4){
            let left = true
            let rigth = true

            if(bs.board[player][0].value == 4 && bs.board[player][0].type == piece.type){
                for(let j = 3; j > 0; j--){
                    if(bs.board[player][j].type != 0){
                        left = false
                    }
                }
            }else{
                left = false
            }


            if(bs.board[player][7].value == 4 && bs.board[player][7].type == piece.type){
                for(let j = 5; j < 7; j++){
                    if(bs.board[player][j].type != 0){
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

    function operationOnIndex(operation){
        // comprueba si una operacion se sale de los límites del board
        if(operation >= 0 && operation <= 7){
            return true
        }
        return false
    }

    return {calculateMoves}
}) 