import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import Users from "../utils/sesionModule.js"
import ContenedorSesion from "../contenedores/contenedorSesion.js"
import upload from '../utils/multer.js'

const LocalStrategy = Strategy

const {Router} = express

const routerSesion = Router()

passport.use('ingreso', new LocalStrategy(
    async (username, password, done) =>{

        let usuario = await Users.findOne({"username": username})

        if(!usuario){
            return done(null, false, {message: `Usuario ${username} no encontrado`})
        }
        if(!ContenedorSesion.validarPassword(usuario, password)){
            return done(null, false, {message: 'Password incorrecto'})
        }
        return done(null, usuario)

    }
))

passport.use('registro', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const {filename} = req.file
    const {name, address, age, phone} = req.body
    let usuario = await Users.findOne({ "username": username})
    if(usuario){
        return done (null, false, {message: `El usuario ${username} ya existe`})
    }
    const passCrypted = ContenedorSesion.createHash(password)
    return done(null, ContenedorSesion.guardarUsuario(username, passCrypted,name, address, age, phone, filename))
}))

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });

  routerSesion.get('/registro', (req, res)=>{
    res.status(200).render('main')
})


routerSesion.post('/registro', upload.single('avatar'),passport.authenticate('registro',{
    successRedirect: 'ingreso',
    failureRedirect: 'registro'
}))

routerSesion.get('/ingreso', (req, res)=>{
    res.status(200).render('login')
})

routerSesion.post('/ingreso', passport.authenticate('ingreso',{
    successRedirect: 'home',
    failureRedirect: 'ingreso'
}))

routerSesion.get('/home', ContenedorSesion.checkAuth , (req,res)=>{
    try{
        res.status(200).render('home',{
            name: req.user.username,
            avatar: req.user.avatar
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

routerSesion.get('/logout', (req,res,next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err)
        }
        res.redirect('ingreso')
    })
})

export default routerSesion