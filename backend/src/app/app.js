import express, { json } from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true
}))


app.use(json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));


// Router Import 
import userRoute from '../routes/user.route.js';


// Routes Declaration 
app.use("api/v1/user",userRoute);


export {app}




