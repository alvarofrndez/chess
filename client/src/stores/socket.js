import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

export const socketStore = defineStore('socket', () => {
    let socket = undefined
    let message = {
        event: undefined,
        data: {}
    }
    let online = ref(0)
    let game = ref(false)
    let searching = ref(false)
    let player = ref(undefined)

    function initSocket(){
        socket = io('ws://localhost:3000')

        socket.on('playerActivity', (message) => {
            online.value = message
        })

        socket.on('matchFind', (message) => {
            game.value = true
            searching.value = false
            player.value = message.player_type
        })

        socket.on('playerMove', message => {
            console.log(message)
        })
    }

    function searchGame(){
        searching.value = true

        message.event = 'newMatch'
        message.data.player = socket.id

        sendMessage()
    }

    function playerMove(piece, row, column){
        message.event = 'playerMove'
        message.data = {
            piece: piece,
            row: row,
            column: column
        }

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

    return{online, game, searching, player, searchGame, playerMove, initSocket}
})