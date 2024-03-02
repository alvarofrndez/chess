import { defineStore } from 'pinia'
import { ref } from 'vue'
import { globalStore } from '@/stores/global'
import { toastStore } from '@/stores/toast';


export const userStore = defineStore('user', () => {

    // stores
    const global_s = globalStore()
    const toast_s = toastStore()

    // variables
    const user = ref({
        id: undefined,
        username: undefined,
        name: undefined,
        token: undefined,
        rating: undefined,
        password: undefined,
        email: undefined,
        photo: '/src/assets/images/profile-photo.png',
        banner: undefined,
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
        movements: []
    })
    const api_route = global_s.API_URL + 'user/'

    // functions
    async function isLoggued(){
        /**
         * Comprueba si el usuario esta logueado obteniendo su token
         * 
         * return: devuelve true si el usuario tiene token y false si no tiene o da un error
         */
        const result_query = await getLocalKey();

        if (result_query) {
            const token = localStorage.getItem(result_query);

            if (token) {
                getUserByToken(token)
                return true
            }
            return false
        }

        return null
    }

    async function getLocalKey(){
        /**
         * Hace la peticion para obtener la key del localStorage
         * 
         * return: devuelve la key o null si ocurre un error
         */
        try{
        const response = await fetch(api_route + 'getLocalKey', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        }).catch(() => {
            return null
        })

        if(response){
            if (!response.ok)
                return null

            const data = await response.json()

            if(data.status)
                return data.key
            else
                return false
        }
            return null
        }catch (error){
            return null;
        }
    }

    async function singIn(username, email, password) {
        // TODO: pregunatr mantener inicio de sesion y crear y almacenar token
        /**
         * Registra un usuario en la base de datos
         * 
         * username (string): nombre de usuario 
         * email (string): correo
         * password (string): contraseña 
         */
        const response = await fetch(api_route + 'singIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        }).catch(() => {
            toast_s.show('Ha ocurrido un error', 'error')
            return false
        })

        return manageLoginResponse(response)
    }

    async function login(email, password){
        /**
         * Loguea a un usuario
         * 
         * email (string): correo
         * password (string): contraseña 
         */
        const response = await fetch(api_route + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).catch(() => {
            toast_s.show('Ha ocurrido un error', 'error')
            return false
        })

        return manageLoginResponse(response)
    }

    async function logout(){
        /**
         * Desloguea a un usuario, borrando su token
         */
        const response = await fetch(api_route + 'deleteTokenUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.value.email
            }),
        }).catch(() => {
            toast_s.show('Ha ocurrido un error', 'error')
            return false
        })

        return manageLogoutResponse(response)
    }

    async function manageLoginResponse(response){
        /**
         * Maneja los datos recibidos del servidor una vez que se logua o registra
         * 
         * response (void | Response): respuesta del servidor
         */
        if(response){
            if(!response.ok)
                toast_s.show('Ha ocurrido un error', 'error')

            const data = await response.json()

            if(data.status){
                setLoginUser(data.data)
            
                toast_s.show('Bienvenido ' + user.value.username, 'success')
                return true
            }else
                toast_s.show(data.message, 'error')

        }else 
            toast_s.show('Ha ocurrido un error', 'error')

        return false
    }

    async function manageLogoutResponse(response){
        /**
         * Maneja los datos recibidos del servidor una vez que se desloguea
         * 
         * response: respuesta del servidor
         */
        if(response){
            if(!response.ok)
                toast_s.show('Ha ocurrido un error', 'error')

            const data = await response.json()

            if(data.status){
            
                toast_s.show('Hasta pronto ' + user.value.username, 'success')
                
                setVoidUser()
                deleteLocalToken()

                return true
            }else
                toast_s.show(data.message, 'error')

        }else 
            toast_s.show('Ha ocurrido un error', 'error')

        return false
    }

    function setLoginUser(data){
        /**
         * Iguala la variable user a los valores pasados
         * 
         * data: son los valores devueltos de la base de datos
         */
        user.value = data

        if(user.value.photo == null){
            user.value.photo ='/src/assets/images/profile-photo.png'
        }
        
        setLocalToken()
        console.log(user.value)
    }

    async function setLocalToken(){
        /**
         * Inserta el token del usuario en el localStorage
         */

        const result_query = await getLocalKey();

        if(result_query){
            localStorage.setItem(result_query, user.value.token)
        }
    }

    async function deleteLocalToken(){
        /**
         * Borra el token del usuario en el localStorage
         */

        const result_query = await getLocalKey();

        if(result_query){
            localStorage.removeItem(result_query)
        }
    }

    async function getUserByToken(token){
        /**
         * Loguea a un usuario
         * 
         * email (string): correo
         * password (string): contraseña 
         */
        const response = await fetch(api_route + 'getUserByToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
        }).catch(() => {
            toast_s.show('Ha ocurrido un error', 'error')
            return false
        })

        return manageLoginResponse(response)
    }

    function setVoidUser(){
        user.value = {
            id: undefined,
            username: undefined,
            name: undefined,
            token: undefined,
            rating: undefined,
            password: undefined,
            email: undefined,
            photo: '/src/assets/images/profile-photo.png',
            banner: undefined,
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
        }
    }

    async function getPing(){
        /**
         * Obtiene el ping del cliente enviando una petición al servidor y calculando
         * la diferencia de tiempo con la respuesta
         */
        const startTime = new Date().getTime();

        const response = await fetch(api_route + 'getPing', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        }).catch(() => {
            return 999
        })

        if(response){
            if (!response.ok)
                return 999

            const data = await response.json()

            if(data.status)
                return new Date().getTime() - startTime
            else
                return 999
        }

        return 999
    } 

    return { user, isLoggued, singIn, login, logout, getPing}
})