import express from 'express'
import connectDB from './src/conexionDB/mongoDB.js'
import * as dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import routerCarrito from './src/routes/routerCarrito.js'
import routerProductos from './src/routes/routerProductos.js'
import routerSesion from './src/routes/routerSesion.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views','./src/views')

app.use(session({
    secret: 'secret',
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: false,
    },
    resave: false,
    rolling: true, 
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/public', express.static(`./src/public`))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use(routerSesion)

export default app