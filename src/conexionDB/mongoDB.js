import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const url = 'mongodb+srv://jmdolce:Coder2022@cluster0.ckxejzf.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB