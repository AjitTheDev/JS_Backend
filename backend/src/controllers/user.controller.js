
import {User} from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';


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

    const {userId, password,userName,role,} = req.body
    console.log(req.body)

    const user = await User.findOne({userId:userId});

    console.log(user,'found user')

    if(!user){
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404, "Invalid user credential !!")
    }


    if(user){
        const token = await jwt.sign({userName:userName, role:role, userId:userId},process.env.ACCESS_TOKEN,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        return res
        .cookie("ACCESS_TOKEN",token,{
            httpOnly:true,
        })
        .status(200)
        .json(new ApiResponse(200, "User validated successfully !!"))
    }
})

const logoutUser = asyncHandler(async(req,res)=>{
    return res
    .clearCookie("ACCESS_TOKEN")
    .status(200)
    .json(new ApiResponse(200, "Successfully logout 😏 🍀"))
})

const getAllUsers = asyncHandler(async(req, res)=>{
    const user = await User.find({});

    if(!user){
        throw new ApiError(404, "No record found.")
    }

   return res.status(200)
    .json(new ApiResponse(200, 
        user,
        "User fetched successfully"))
})


const authorization = asyncHandler(async(req,res,next)=>{
    const token =req.cookies.ACCESS_TOKEN

    if(!token){
        throw new ApiError(403, "Invalid User");
    }
    try{
        const data = jwt.verify(token,process.env.ACCESS_TOKEN);
        req.userId = data.userId;
        req.userName = data.userName;
        req.role = data.role;
        return next();
    }catch(error){
        throw new ApiError(403, "Invalid Token")
    }
})


export {
    registerUser,
    loginUser,
    getAllUsers,
    authorization,
    logoutUser
}