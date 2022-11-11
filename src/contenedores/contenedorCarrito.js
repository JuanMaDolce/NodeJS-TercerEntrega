import Productos from "../utils/productosModule.js"
import Carrito from "../utils/carritoModule.js"
import {mailCompra} from '../utils/mail.js'
import {enviarSMS, enviarWhatsapp} from '../utils/mensajes.js'

const arrayProductos = []

class ContenedorCarrito{
    getCartById = async (id) => {
        try{
            let findCart = await Carrito.findById(id)

            if (findCart){

                return findCart
            } else {
                const error = {error: 'ID de carrito inexistente' }
                return error
            }
        } catch (err){
            logger.error(err)
        }
    }

    saveCart = async () => {
        let carrito = new Carrito()
        try{
            await carrito.save()
            return carrito
        } catch (error) {
            logger.error(error.messege)
        } 
    }

    deleteCartByID = async (id) => {
        try{
            await Carrito.findByIdAndDelete(id)
            let res = {mensaje: `Carrito ${id} eliminado`}
            return res
        } catch (err) {
            logger.error(err)
        }
    }

    addProductToCart = async (id) => {
        try{
            const cartFind = await Carrito.find()

            const product = await Productos.findById(id)

            arrayProductos.push(product)

            if(cartFind.length && product){

                cartFind[0].productos = arrayProductos

                await cartFind[0].save()
                
                return cartFind[0]

            } else if (product){
                let carrito = new Carrito({
                    productos: arrayProductos
                })
                await carrito.save()
                return carrito
            }  else {
                const error = 'ID producto inexistente'
                return error
            }
        } catch (err){
            logger.error(err)
        }
    }

    deleteProductByID = async (id,id_prod) => {
        
        const cartFind = await Carrito.findById(id)

        if(cartFind){

            const products = await cartFind.productos

            const newCart =  await Carrito.findByIdAndUpdate(id, {productos: products.filter(p => p._id != id_prod)})

            return newCart

        } else{
            const error = {error: 'ID de producto inexistente' }
            return error 
        } 
    } 
    enviarPedido = async (user) => {
        const carrito = await Carrito.findOne()
        mailCompra(user,carrito)
        enviarSMS(user)
        enviarWhatsapp(user,carrito)
        return `${user.username} Tu pedido con el ID ${carrito.id} ha sido enviado` 
    } 
}
export default ContenedorCarrito
