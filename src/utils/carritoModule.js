import mongoose from "mongoose"

const CarritoSchema = new mongoose.Schema({
    timestamp:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    productos: {type: Array}
})

export default mongoose.model('Carrito', CarritoSchema)