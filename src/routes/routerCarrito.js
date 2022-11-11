import { apiCarrito } from '../daos/index.js'
import express from 'express'
import ContenedorSesion from "../contenedores/contenedorSesion.js"

const {Router} = express

const routerCarrito = Router()

routerCarrito.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
    const carrito = await apiCarrito.getCartById(id)
    res.status(200).render('carrito',{
        carrito
    })
})

routerCarrito.post('/', async (req,res) =>{
    const newCartAdd = await apiCarrito.saveCart()
    res.send(newCartAdd)
})

routerCarrito.post('/pedido', ContenedorSesion.checkAuth, async (req,res) =>{
    const enviarPedido = await apiCarrito.enviarPedido(req.user)
    res.send(enviarPedido)
})

routerCarrito.delete('/:id', async (req,res)=>{
    const {id} = req.params
    res.send(await apiCarrito.deleteCartByID(id))
})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const {id,id_prod} = req.params
    res.send(await apiCarrito.deleteProductByID(id,id_prod))
}) 

routerCarrito.post('/:id/productos', async (req,res) =>{
    const {id} = req.params
    const productToCart = await apiCarrito.addProductToCart((id))
    res.json(productToCart)
}) 

export default routerCarrito