const socket_ctrl = require('../../controllers/socket/index');

module.exports = function(socket) {
    socket_ctrl.newClientConnected(socket);

    socket.on('newMatch', (message) => {
        socket_ctrl.newMatch(socket, message);
    });

    socket.on('cancelQueue', (message) => {
        socket_ctrl.cancelQueue(message);
    });

    socket.on('playerMove', (message) => {
        socket_ctrl.playerMove(socket, message);
    });

    socket.on('disconnect', () => {
        socket_ctrl.disconnect(socket)
    });

    socket.on('close', () => {
        socket_ctrl.disconnect(socket)
    })
};