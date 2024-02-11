import { defineStore } from 'pinia'

export const regExStore = defineStore('regEx', () => {

    const regExUsername = /^[^/{}'"\\]{0,25}$/
    const regExEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/

    function checkUsername(username){
        if(regExUsername.test(username)){
            return true
        }

        return false
    }

    function checkEmail(email){
        if(regExEmail.test(email)){
            return true
        }

        return false
    }

    function checkPassword(password){
        if(regExPassword.test(password)){
            return true
        }

        return false
    }

    return {checkUsername, checkEmail, checkPassword}
})