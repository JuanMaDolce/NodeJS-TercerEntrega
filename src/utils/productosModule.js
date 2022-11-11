import mongoose from "mongoose"

const ProctosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
})

export default mongoose.model('Productos', ProctosSchema)