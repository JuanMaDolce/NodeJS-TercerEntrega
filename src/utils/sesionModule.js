import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    address: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
        trim: true,
    } 
})

export default mongoose.model('Users', UsersSchema)