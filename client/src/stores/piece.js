import { defineStore } from 'pinia'
import { boardStore } from '@/stores/board';

export const pieceStore = defineStore('piece', () => {
    const bs = boardStore()

    function calculateMoves(piece, row, column){
        // console.log('piece ', piece.type, row, column)
        let posible_moves = []

        // logica de peón con captura, no coronación
        if(piece.value == 1){
            // TODO: coronacion, cambiar la pieza a reina(5)
            let initial = false
            let can_pass = false

            // salida
            if((piece.type == -1 && row == 6) || (piece.type == 1 && row == 1)){
                initial = true
            }


            // uno hacia alante
            if(bs.board[row + piece.type][column].value == 0){
                if(row + piece.type >= 0 && row + piece.type <= 7){
                    can_pass = true
                    posible_moves.push({
                        row: row + piece.type,
                        column: column
                    })
                }
            }

            // dos hacia alante solo en salida
            if(initial){
                if(bs.board[row + piece.type * 2][column].value == 0 && can_pass){
                    if(row + piece.type * 2 >= 0 && row + piece.type * 2 <= 7){
                        posible_moves.push({
                            row: row + piece.type * 2,
                            column: column
                        })
                    }
                }
            }
            
            // captura izquierda
            if((row + piece.type && column -1) >= 0 && (row + piece.type && column -1) <= 7){
                if(bs.board[row + piece.type][column - 1].type * -1 == piece.type){
                    posible_moves.push({
                        row: row + piece.type,
                        column: column - 1
                    })
                }
            }

            // captura derecha
            if((row + piece.type && column + 1) >= 0 && (row + piece.type && column + 1) <= 7){
                if(bs.board[row + piece.type][column + 1].type * -1 == piece.type){
                    posible_moves.push({
                        row: row + piece.type,
                        column: column + 1
                    })
                }
            }
        }
        return posible_moves
    }

    return {calculateMoves}
}) 