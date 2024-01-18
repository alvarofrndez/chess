import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
    const user = ref({
        id: 0,
        username: 'alvarito',
        name: 'alvaro',
        rating: 0,
        password: 'contraseña',
        email: 'alvaro@gmail.com',
        photo: '/src/assets/images/profile-photo.png',
        banner: 'afsdfasd',
        last_games: [
            {
                id: 1,
                player1: {
                    type: -1,
                    name: 'pepe'
                },
                player2: {
                    type: 1,
                    name: 'jose'
                },
                winner: 1
            },
            {
                id: 2,
                player1: {
                    type: 1,
                    name: 'pepe'
                },
                player2: {
                    type: -1,
                    name: 'jose'
                },
                winner: -1
            },
            {
                id: 3,
                player1: {
                    type: -1,
                    name: 'pepe'
                },
                player2: {
                    type: 1,
                    name: 'jose'
                },
                winner: 1
            },
            {
                id: 4,
                player1: {
                    type: -1,
                    name: 'pepe'
                },
                player2: {
                    type: 1,
                    name: 'jose'
                },
                winner: 0
            },
        ],
        ping: {
            total: undefined,
            function: () => {
                setInterval(() => {
                    const startTime = new Date().getTime();

                    fetch('localhost:')
                    .then(response => response.json())
                    .then(data => {
                        const endTime = new Date().getTime();
                        const totalPing = endTime - startTime;
                        const serverPing = data.ping;
                        const clientPing = totalPing - serverPing;
                        console.log('Total Ping:', totalPing, 'milisegundos');
                        console.log('Server Ping:', serverPing, 'milisegundos');
                        console.log('Client Ping:', clientPing, 'milisegundos');
                    })
                    .catch(error => console.error('Error de ping:', error));
                }, 1000)
            } 
        }
    })

    return {user}
})