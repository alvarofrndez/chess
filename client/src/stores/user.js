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
        photo: '/src/assets/images/profile-photo.png'
    })

    return {user}
})