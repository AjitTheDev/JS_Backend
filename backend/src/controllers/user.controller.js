
import {User} from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'


const registerUser =asyncHandler(async(req,res)=>{
    req.body

    const {userId, userName, email, role,password} = req.body;
    console.log('Register user',req.body)

     const user =await User.create({
        userId,
        userName,
        email,
        password,
        role
     })

    return res.status(201).json(200,user, "User registered successfully !! ")
})


const loginUser=asyncHandler(async(req,res)=>{

    const {userId, password} = req.body
    console.log(req.body)

    const user = await User.findOne({userId:userId})

    console.log(user,'found user')

    if(!user){
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404, "Invalid user credential !!")
    }

   // try{
        if(user){
            return res.status(200)
            .json(new ApiResponse(200, "User validated successfully !!"))
        }

        





   // }catch(error){
        //throw new ApiError(404, "User doesn't exists")
    //}



   

    
})


export {
    registerUser,
    loginUser
}