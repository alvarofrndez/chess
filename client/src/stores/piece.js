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