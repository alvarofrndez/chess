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
        ]
    })

    return {user}
})