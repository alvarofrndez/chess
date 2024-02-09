const hash = require('../hash');

const db = require('../../config/connection').connection

module.exports = {
    async isRegistered(email){
        /**
         * Comprueba si un usuario ya está registrado a través del email
         * 
         * email (string): email del usuario
         * 
         * return: promesa booleana
         */
        return new Promise((res, rej) => {
            db.query(`select * from user where email = '${email}'`, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if(result.length > 0){
                    res(true)
                }else{
                    res(false)
                }
            })
        })
        
    },
    
    async getuserByEmail(email){
        /**
         * Obtiene un usuario por su email
         * 
         * email (string): email del usuario
         * 
         * return: promesa de usuario o false
         */
    
        return new Promise((res, rej) => {
            db.query(`select * from user where email = '${email}'`, (err, result) => {
                if(err){
                    rej(err)
                }

                if(result.length > 0){
                     res(result[0])
                }else{
                     res(false)
                }
            })
        })
        
    },

    async insertToken(email, hashed_password, salt){
        /**
         * Inserta el token de un usuario
         * 
         * email (string): email del usuario
         * hashed_password (string): contraseña hasheada
         * salt (string): salt de la constraseña
         * 
         * return: promesa del token o false
         */
    
        return new Promise((res, rej) => {
            let token = hash.hashPassword(hashed_password + salt)

            db.query(`update user set token = '${token.hashed_password}' where email = '${email}'`, (err, result) => {
                if(err){
                    rej(err)
                }

                if(result && result.affectedRows > 0){
                    res(token.hashed_password)
                }else{
                    res(false)
                }
            })
        })
        
    }
}