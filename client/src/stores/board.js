import { ref } from 'vue'
import { defineStore } from 'pinia'

export const boardStore = defineStore('board', () => {
  /*
  *
  * El ajedrez es una matriz de 8 * 8
  * espacios vacios = 0
  * peón = 1
  * alfil = 2
  * caballo = 3
  * torre = 4
  * dama = 5
  * rey = 6
  */

  const board = ref([])
  
  function createBoard() {
    let new_board = []

    for(let i=0; i<8; i++){
      new_board.push([])
      for(let j=0; j<8; j++){
        let piece = {
          type: undefined,
          value: undefined,
          color: '',
          possible_move: '',
          img: ''
        }

        if(i == 1){
          piece.type = 1
          piece.value = 1
          piece.img = 'src/assets/images/peon-negro.png'
        }else if(i == 6){
          piece.type = -1
          piece.value = 1
          piece.img = 'src/assets/images/peon-blanco.png'
        }else if(i == 0){
          if(j == 0 || j == 7){
            piece.type = 1
            piece.value = 4
            piece.img = 'src/assets/images/torre-negra.png'
          }else if(j == 1 || j == 6){
            piece.type = 1
            piece.value = 3
            piece.img = 'src/assets/images/caballo-negro.png'
          }else if(j == 2 | j == 5){
            piece.type = 1
            piece.value = 2
            piece.img = 'src/assets/images/alfil-negro.png'
          }else if (j == 3){
            piece.type = 1
            piece.value = 5
            piece.img = 'src/assets/images/reina-negra.png'
          }else if(j == 4){
            piece.type = 1
            piece.value = 6
            piece.img = 'src/assets/images/rey-negro.png'
          }
        }else if(i == 7){
          if(j == 0 || j == 7){
            piece.type = -1
            piece.value = 4
            piece.img = 'src/assets/images/torre-blanca.png'
          }else if(j == 1 || j == 6){
            piece.type = -1
            piece.value = 3
            piece.img = 'src/assets/images/caballo-blanco.png'
          }else if(j == 2 | j == 5){
            piece.type = -1
            piece.value = 2
            piece.img = 'src/assets/images/alfil-blanco.png'
          }else if (j == 3){
            piece.type = -1
            piece.value = 5
            piece.img = 'src/assets/images/reina-blanca.png'
          }else if(j == 4){
            piece.type = -1
            piece.value = 6
            piece.img = 'src/assets/images/rey-blanco.png'
          }
        }else{
          piece.type = 0
          piece.value = 0
        }

        // poner el color del fondo de la pieza
        piece.color = (i + j) % 2 == 0 ? 'white' : 'brown'

        new_board[i].push(piece);
      }
    }
    return new_board
  }
  
  return { board, createBoard}
})