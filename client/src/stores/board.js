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
        if(i == 1){
          new_board[i].push({
            type: 1,
            value: 1
          });
        }else if(i == 6){
          new_board[i].push({
            type: 0,
            value: 1
          });
        }else if(i == 0){
          if(j == 0 || j == 7){
            new_board[i].push({
              type: 1,
              value: 4
            });
          }else if(j == 1 || j == 6){
            new_board[i].push({
              type: 1,
              value: 3
            });
          }else if(j == 2 | j == 5){
            new_board[i].push({
              type: 1,
              value: 2
            });
          }else if (j == 3){
            new_board[i].push({
              type: 1,
              value: 6
            });
          }else if(j == 4){
            new_board[i].push({
              type: 1,
              value: 5
            });
          }
        }else if(i == 7){
          if(j == 0 || j == 7){
            new_board[i].push({
              type: 0,
              value: 4
            });
          }else if(j == 1 || j == 6){
            new_board[i].push({
              type: 0,
              value: 3
            });
          }else if(j == 2 | j == 5){
            new_board[i].push({
              type: 0,
              value: 2
            });
          }else if (j == 3){
            new_board[i].push({
              type: 0,
              value: 5
            });
          }else if(j == 4){
            new_board[i].push({
              type: 0,
              value: 6
            });
          }
        }else{
          new_board[i].push(0);
        }
      }
    }
    return new_board
  }
  
  return { board, createBoard}
})