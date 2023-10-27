const express = require('express')
const WebSocket = require('ws');
const PORT = 3000
const app = express()

const codi = 'utf-8'

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server:server });

var count_ids = 0;
const clients = new Set()
const matchs = new Set()

wss.on('connection', (ws) => {

    newClientConnected(ws)
    console.log(clients.size)

    ws.on('disconnect', () => {
        console.log('desconectado')
        clients.delete(ws)
    })

    ws.on('close', () => {
        console.log('cliente cerrado')
        clients.delete(ws)
    })

    ws.on('message', (data) => {
        message = decodeString(data) + " enviado por " + ws.id
        sendToAll(message, ws)
    })

    // revisar codigo entero, añadir sistemas de colas y busqueda de partidas
    ws.on('newMatch', () => {
        console.log('entra')
        if(clients.size > 1){
            adding = false

            if(matchs.size != 0){
                players_on = new Set()
                for(let match of matchs){
                    for(let player of match){
                        players_on.add(player.id)
                    }
                }
    
                new_match = new Set()
                for(let client of clients){
                    if(new_match.size < 2){
                        is_playing = players_on.map((id) => id == client.id)
                        if(!is_playing){
                            adding = true
                            new_match.add(client)
                        }
                    }else{
                        matchs.add(new_match)
                        return
                    }
                }
            }else{
                new_match = new Set()
                for(let client of clients){
                    if(new_match.size < 2){
                        new_match.add(client)
                    }else{
                        matchs.add(new_match)
                        return
                    }
                }
            }

            if(adding)
                ws.send('has sido añadido a un partido')
            console.log(matchs)
        }else{
            ws.send('no hay jugadores conectados')
        }
    })

    // sendToAll('clientes conectados: ' + clients.size, ws)
})

function decodeString(string){
    // decodifica un string que viene como un buffer desde el cliente
    return string.toString(codi)
}

function sendToAll(message, ws){
    clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function newClientConnected(ws){
    ws.id = count_ids
    clients.add(ws)
    count_ids++
}
server.listen(PORT, () => console.log(`escuchando en el puerto: ${PORT}`))