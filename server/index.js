const { match } = require('assert');
const express = require('express');
const Server = require('socket.io').Server

const PORT = 3000
const app = express()

const cors_options = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const codi = 'utf-8'

const server = require('http').createServer(app)
server.listen(PORT, () => console.log(`escuchando en el puerto: ${PORT}`))

const io = new Server(server, {
    cors: cors_options, 
})

const clients = new Set()
const matchs = new Set()
const queue = new Set()
let message = {
    event: undefined,
    data: {}
} 

io.on('connection', (socket) => {

    newClientConnected(socket)
    console.log(clients.size)

    socket.on('disconnect', () => {
        clients.delete(socket)

        sendPlayerActivity(socket)
        console.log(clients.size)
    })

    socket.on('close', () => {
        clients.delete(socket)

        sendPlayerActivity(socket)
        console.log(clients.size)
    })

    socket.on('message', (data) => {
        message = decodeString(data) + " enviado por " + socket.id
        sendToAll(message, socket)
    })

    // revisar codigo entero, añadir sistemas de colas y busqueda de partidas
    socket.on('newMatch', (message) => {
        if(queue.size > 0){
            // nueva partida
            newMatch(Array.from(queue)[0], socket)
        }else if(queue.size == 0){
            queue.add(socket)
        }


        // if(clients.size > 1){
        //     adding = false

        //     if(matchs.size != 0){
        //         players_on = new Set()
        //         for(let match of matchs){
        //             for(let player of match){
        //                 players_on.add(player.id)
        //             }
        //         }
    
        //         new_match = new Set()
        //         for(let client of clients){
        //             if(new_match.size < 2){
        //                 is_playing = players_on.map((id) => id == client.id)
        //                 if(!is_playing){
        //                     adding = true
        //                     new_match.add(client)
        //                 }
        //             }else{
        //                 matchs.add(new_match)
        //                 return
        //             }
        //         }
        //     }else{
        //         new_match = new Set()
        //         for(let client of clients){
        //             if(new_match.size < 2){
        //                 new_match.add(client)
        //             }else{
        //                 matchs.add(new_match)
        //                 return
        //             }
        //         }
        //     }

        //     if(adding)
        //         socket.send('has sido añadido a un partido')
        // }else{
        //     socket.send('no hay jugadores conectados')
        // }
    })

    socket.on('playerMove', message => {
        for(let match of matchs){
            for(let player of match){
                if(player.id == socket.id){
                    if(match.indexOf(player) == 0){
                        playerMove(message, match[1])
                        return
                    }else{
                        playerMove(message, match[0])
                        return
                    }
                }
            }
        }
    })

    message.event = 'playerActivity'
    message.data = clients.size

    sendToAll(socket)
})

function newMatch(player1, player2){
    if(player1.id != player2.id){
        matchs.add([player1, player2])
        queue.delete(player1)

        let match = {
            player_type : -1
        } 
    
        message.event = 'matchFind'
        message.data = match
        sendMessage(player1)

        match.player_type = 1
    
        message.event = 'matchFind'
        message.data = match
        sendMessage(player2)
    }
}

function playerMove(data, player){
    message.event = 'playerMove'
    message.data = data
    sendMessage(player)
}

function decodeString(string){
    // decodifica un string que viene como un buffer desde el cliente
    return string.toString(codi)
}

function sendToAll(socket){
    clients.forEach((client) => {
        if (/*client !== socket &&*/ client.connected) {
            client.emit(message.event, message.data)
        }
    });

    resetMessage()
}

function sendPlayerActivity(socket){
    message.event = 'playerActivity'
    message.data = clients.size

    sendToAll(socket)
}

function sendMessage(client){
    console.log(client.id, message)
    client.emit(message.event, message.data)

    resetMessage()
}

function resetMessage(){
    message = {
        event: undefined,
        data: {}
    } 
}

function newClientConnected(socket){
    clients.add(socket)
}