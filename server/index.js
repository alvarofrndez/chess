const express = require('express')
const Server = require('socket.io').Server
const env = require('./env') 

const PORT = env.SERVER_PORT || 3001
const HOST = env.SERVER_HOST
const app = express()

const cors_options = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const codi = 'utf-8'

const server = require('http').createServer(app)
server.listen(PORT, HOST, () => console.log(`escuchando en el puerto: ${PORT}`))

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

    socket.on('newMatch', (message) => {
        // uno el socket entero con el usuario
        let data = {
            socket: socket,
            user: message.player.user
        }

        if(queue.size > 0){
            // nueva partida
            newMatch(Array.from(queue)[0], data)
        }else if(queue.size == 0){
            queue.add(data)
        }
    })

    socket.on('cancelQueue', (message) => {
        for( let sk of queue)
            if(sk.id == message.player){
                queue.delete(sk)
                return
            }
    })

    socket.on('playerMove', message => {
        for(let match of matchs){
            for(let player of match){
                if(player.socket.id == socket.id){
                    if(match.indexOf(player) == 0){
                        playerMove(message, match[1].socket)
                        return
                    }else{
                        playerMove(message, match[0].socket)
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
    if(player1.socket.id != player2.socket.id){
        matchs.add([player1, player2])
        queue.delete(Array.from(queue)[0])

        let match = {
            player_type : -1,
            player_white : player1.user,
            player_black : player2.user
        } 
    
        message.event = 'matchFind'
        message.data = match
        sendMessage(player1.socket)

        match.player_type = 1
    
        message.event = 'matchFind'
        message.data = match
        sendMessage(player2.socket)
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