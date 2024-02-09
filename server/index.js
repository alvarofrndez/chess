// global
require('dotenv').config()
const express = require('express')
const app = express()


// socket
const Server = require('socket.io').Server
const PORT = process.env.SERVER_PORT || 3001
const HOST = process.env.SERVER_HOST
const server = require('http').createServer(app)
const socketRoutes = require('./src/routes/socket/index')

// creacion del servidor
server.listen(PORT, HOST, () => console.log(`Socket esuchando en: ${PORT}`))

const cors_options = {
    origin: process.env.URL_CLIENT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const io = new Server(server, {
    cors: cors_options, 
})

// events
io.on('connection', (socket) => {
    socketRoutes(socket);
})


// api
const cors = require('cors')
const handleDisconnect = require('./src/config/handle').handleDisconnect
const DB_PORT = require('./src/config/database').port

app.use(cors())
app.use(express.json())

handleDisconnect();
app.listen(DB_PORT, () => {
  console.log(`Api escuchando en ${DB_PORT}`)
})

// endspoints
const route_ep = require('./src/config/connection').route
const user_ep = require('./src/routes/api/user')

app.use(route_ep + 'user', user_ep)