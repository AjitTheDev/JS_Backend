import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true
}))


app.use(json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser())


// Router Import 
import userRoute from '../routes/user.route.js';
import expenseRoute from '../routes/expense.route.js'


// Routes Declaration 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/expense",expenseRoute);


export {app}




