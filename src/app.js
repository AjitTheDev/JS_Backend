import express from 'express'
import cors from 'cors'

const app=express();



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))



//router import
import todoRouter from './routes/notes.routes.js'


//routes Declaration
app.use("/api/v1/todo",todoRouter)

export {app}

