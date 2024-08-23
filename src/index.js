import connectDB from "./db/index.js";
import { app } from "./app.js";
import dotenv from 'dotenv'


dotenv.config({
    path:'./env'
})


connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log('Error',error)
        throw error
    })

    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('Mongo DB connection failed !!!',err)
})