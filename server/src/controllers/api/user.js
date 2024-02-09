const db = require('../../config/connection').connection
const hash = require('../../utilities/hash')
const user_utilities = require('../../utilities/user/user')
require('dotenv').config()

// utilities 

module.exports = {

    // end-points
    async getLocalKey(req, res){
        /**
         * Obtiene la key para el localStorage
         */

        db.query(`select * from local_key where id = 1`, (err, result) => {
            if (err) {
                return res.json({status: false})
            }

            if(result.length > 0){
                return res.json({status: true, key: result[0].key})
            }else{
                return res.json({status: false});
            }
        });
    },

    async singIn(req, res){
        // TODO: insertar el token en caso de que decida mantener la sesion iniciada
        /**
         * Registra un usuario en la base de datos y devuelve sus valores,
         * incluyendo el id
         */
        const { name, email, password } = req.body

        const is_registered = await user_utilities.isRegistered(email)

        if(is_registered){
            return res.json({
                status: false,
                message: 'El usuario ya está registrado'
            })
        }else{
            const { hashed_password, salt } = await hash.hashPassword(password)
            
            db.query(`insert into user (email, name, password, status, salt) values('${email}', '${name}', '${hashed_password}', ${process.env.STATUS_ACTIVE}, '${salt}')`, (err, result) => {
                if (err){
                    return res.json({
                        status: false,
                        message: 'Ha ocurrido un error'
                    })
                } 

                if (result && result.affectedRows > 0) {
                    return res.json({
                        status: true,
                        message: 'Registro correcto',
                        data: {
                            id: result.insertId,
                            email: email,
                            name: name,

                        }
                    })
                } else {
                    return res.json({
                        status: false,
                        message: 'No se ha podido registrar'
                    })
                }
            })
        }
    },

    async login(req, res){
        /**
         * Comprueba si existe el usuario
         * 
         * return: objeto usuario
         */
        const {email, password} = req.body

        const user = await user_utilities.getuserByEmail(email)

        const { hashed_password, salt } = await hash.hashPassword(password)

        if(user){
            if(await hash.comparePasswords(user.salt + hashed_password, user.salt + user.password)){
                return res.json({
                    status: true,
                    message: 'Inicio correcto',
                    data: user
                })
            }else{
                return res.json({
                    status: false,
                    message: 'Datos erroneos'
                })
            }
        }else{
            return res.json({
                status: false,
                message: 'Datos erroneos'
            })
        }
    }
}