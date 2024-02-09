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
        
    }
}