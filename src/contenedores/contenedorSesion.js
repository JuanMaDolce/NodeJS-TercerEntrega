import bcrypt from 'bcrypt'
import Users from "../utils/sesionModule.js"
import {mailRegistro} from '../utils/mail.js'
import logger from '../logs/logs.js'


class ContenedorSesion {
    static guardarUsuario = async (username, password, name, address, age, phone, filename) =>{

        try{
            let usuario = new Users({
                username,
                password,
                name,
                address,
                age,
                phone,
                avatar: `http://localhost:8080/public/${filename}`
            })

            await usuario.save()
            await mailRegistro(usuario)
            return usuario
        } catch (err){
            logger.error(err.message)
        }
    }
    static loginUsuario = async (username, password) =>{
        const usuario = await Users.findOne({ $and: [ { "username": username}, { "password": password} ]})
        if(usuario){
            return usuario
        } else {
            return 'Usuario no encontrado'
        }
    }

    static validarPassword =  (usuario, password) =>{
        return bcrypt.compareSync(password, usuario.password)
    } 

    static createHash = (password) =>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }
    
    static checkAuth = (req, res, next) =>{
        if(req.isAuthenticated()) {
            next()
        } else {
            res.redirect('ingreso')
        }
    }
    
}

export default ContenedorSesion