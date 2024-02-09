import { defineStore } from 'pinia'
import { ref } from 'vue'

export const headerStore = defineStore('header', () => {
    let in_auth = ref(false)

    function isInAuth(path){
        /**
         * comprueba si esta en el login o singin
         */
        if(path == '/login' || path == '/singin')
            in_auth.value = true
        else
            in_auth.value = false
    }

    return {in_auth, isInAuth}
})