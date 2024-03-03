// variables
const clients = new Set();
const queue = new Set();
const matchs = new Set();
let message = {
    event: undefined,
    data: {}
};

// routes functions
function newClientConnected(socket) {
    clients.add(socket);
    console.log(clients.size)

    message.event = 'playerActivity'
    message.data = clients.size

    u_sendToAll(socket)
}

function newMatch(socket, message) {
    // uno el socket entero con el usuario
    let data = {
        socket: socket,
        user: message.player.user
    }

    if(queue.size > 0){
        // nueva partida
        u_newMatch(Array.from(queue)[0], data)
    }else if(queue.size == 0){
        queue.add(data)
    }
}

function resigne(message){
    for(let match of matchs){
        for(let player of match){
            if(player.socket.id == message.player){
                // compruebo quien es el que se ha rendido
                let resigne = match.indexOf(player) == 0 ? -1 : 1

                u_finishGame(resigne, match[1].socket)
                u_finishGame(resigne, match[0].socket)

                matchs.delete(match)
                return
            }
        }
    }
}

function cancelQueue(message) { 
    /**
     * Borra el usuario del set queue, por lo que lo saca de la cola
     * 
     * message (JSON):  player -> contiene el id del socket del usuario
     */
    for( let sk of queue){
        if(sk.socket.id == message.player){
            queue.delete(sk)
            return
        }
    }
}

function playerMove(socket, message) {
    for(let match of matchs){
        for(let player of match){
            if(player.socket.id == socket.id){
                if(match.indexOf(player) == 0){
                    u_playerMove(message, match[1].socket)
                    return
                }else{
                    u_playerMove(message, match[0].socket)
                    return
                }
            }
        }
    }
}

function disconnect(socket){
    clients.delete(socket)

    u_sendPlayerActivity(socket)
    console.log(clients.size)
}

module.exports = {
    newClientConnected,
    newMatch,
    cancelQueue,
    playerMove,
    disconnect,
    resigne
};


// utilities functions
function u_newMatch(player1, player2){
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
        u_sendMessage(player1.socket)

        match.player_type = 1
    
        message.event = 'matchFind'
        message.data = match
        u_sendMessage(player2.socket)
    }
}

function u_playerMove(data, player){
    message.event = 'playerMove'
    message.data = data
    u_sendMessage(player)
}

function u_finishGame(loser, player){
    message.event = 'finishGame'
    message.data.loser = loser
    u_sendMessage(player)
}

function u_sendToAll(socket){
    clients.forEach((client) => {
        if (/*client !== socket &&*/ client.connected) {
            client.emit(message.event, message.data)
        }
    });

    u_resetMessage()
}

function u_sendPlayerActivity(socket){
    message.event = 'playerActivity'
    message.data = clients.size

    u_sendToAll(socket)
}

function u_sendMessage(client){
    client.emit(message.event, message.data)

    u_resetMessage()
}

function u_resetMessage(){
    message = {
        event: undefined,
        data: {}
    } 
}