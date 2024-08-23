import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'




const connectDB=async () =>{
    try{
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`\n DB connected: ${connectInstance.connection.host}`)
    }catch(error){
            console.log(`connection failed`,error)
        process.exit(1)
    }
}




export default connectDB;