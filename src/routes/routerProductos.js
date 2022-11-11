import { apiProductos } from '../daos/index.js'
import express from 'express'

const {Router} = express

const routerProductos = Router()

routerProductos.get('/', async (req,res) =>{
    const list = await apiProductos.getAll()
    res.json(list)
})

routerProductos.get('/:id', async (req,res) =>{
    const {id} = req.params
    res.json( await apiProductos.getById(id))
})

routerProductos.post('/', async (req,res) =>{
    const {title,price,thumbnail} = req.body

    const product = await apiProductos.save(title,price,thumbnail)
    res.send(product)
})

routerProductos.put('/:id', async (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    res.send( await apiProductos.upload(id,title,price,thumbnail))
})

routerProductos.delete('/:id', async (req,res)=>{
    const {id} = req.params
    res.send(await apiProductos.deleteById(id))
})

export default routerProductos