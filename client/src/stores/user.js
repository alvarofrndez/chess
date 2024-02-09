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
        id: 0,
        username: 'alvarito',
        name: 'alvaro',
        token: undefined,
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
    const api_route = global_s.API_URL + 'user/'

    // functions
    async function isLoggued(){
        /**
         * Comprueba si el usuario esta logueado obteniendo su token
         * 
         * return: devuelve true si el usuario tiene token y false si no tiene o da un error
         */
        const result_query = await getLocalKey();
        console.log(result_query)
        if (result_query) {
            const token = localStorage.getItem(result_query);
        if (token) {
            user.value.token = token;
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

    async function singIn(name, email, password) {
        // TODO: pregunatr mantener inicio de sesion y crear y almacenar token
        /**
         * Registra un usuario en la base de datos
         * 
         * naem (string): nombre 
         * email (string): correo
         * password (string): contraseña 
         */
        const response = await fetch(api_route + 'singIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        }).catch(() => {
            toast_s.show('Ha ocurrido un error', 'error')
        })

        manageLoginResponse(response)
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
        })

        manageLoginResponse(response)
    }

    function setLoginUser(data){
        /**
         * Iguala la variable user a los valores pasados
         * 
         * data: son los valores devueltos de la base de datos
         */
        user.value.id = data.id
        user.value.email = data.email
        user.value.name = data.name
        console.log(user.value)
        // user.value.token = data.token
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
            
                toast_s.show('Bienvenido ' + user.value.name, 'success')
            }else
                toast_s.show(data.message, 'error')

        }else 
            toast_s.show('Ha ocurrido un error', 'error')
    }

    return { user, isLoggued, singIn, login}
})