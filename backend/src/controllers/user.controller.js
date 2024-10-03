
import mongoose from "mongoose";
import {User} from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { Income } from '../models/income.model.js';
import { Expense } from '../models/expense.model.js';



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

     const createdUser=await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(400, "Something went wrong, while registration !")
    }

    return res.status(201).json(new ApiResponse(200,createdUser, "User registered successfully !! "))
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

    const { password: _, ...userDetails } = user.toObject();

    if(user){
        const token = await jwt.sign({userName:userName, role:role, userId:user._id},process.env.ACCESS_TOKEN,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        return res
        .cookie("ACCESS_TOKEN",token,{
            httpOnly:true,
        })
        .status(200)
        .json(new ApiResponse(200, userDetails, "User validated successfully !!"))
    }
})

const logoutUser = asyncHandler(async(req,res)=>{
    return res
    .clearCookie("ACCESS_TOKEN")
    .status(200)
    .json(new ApiResponse(200, "Successfully logout"))
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

const finalizeMonth = asyncHandler(async (req, res) => {
    const userId = req.userId; // Extract the user ID from the request
    const { month } = req.body; // Get the month from the request body

    console.log('user controller', userId); // Log the user ID for debugging
    const userIdObjectId = new mongoose.Types.ObjectId(userId)

    // Calculate total income for the month
    const totalIncome = await Income.aggregate([
        { 
            $match: { 
                userId: userIdObjectId, 
                month 
            } 
        },
        { 
            $group: { 
                _id: null, 
                total: { $sum: '$amount' } 
            } 
        }
    ]);

    // Calculate total expenses for the month
    const totalExpenses = await Expense.aggregate([
        { 
            $match: { 
                userId: userIdObjectId, 
                month 
            } 
        },
        { 
            $group: { 
                _id: null, 
                total: { $sum: '$amount' } 
            } 
        }
    ]);

    // Calculate the monthly balance
    const incomeTotal = totalIncome[0]?.total || 0; // Default to 0 if no income found
    const expensesTotal = totalExpenses[0]?.total || 0; // Default to 0 if no expenses found
    const monthlyBalance = incomeTotal - expensesTotal;

    // Update the user's total wealth
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found"); // Error handling if user not found
    }
    user.totalWealth += monthlyBalance; // Update total wealth
    await user.save(); // Save the updated user

    // Respond with the result
    res.status(200).json(new ApiResponse(200, `Month finalized. Monthly balance: ${monthlyBalance}, Total wealth: ${user.totalWealth}`));
});





const getUserWealth = asyncHandler(async (req, res) => {
    const userId = req.userId; // Get the userId from the authenticated user
    const user = await User.findById(userId).select('totalWealth'); // Fetch totalWealth only
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    res.status(200)
    .json(new ApiResponse(200,{ totalWealth: user.totalWealth }, 'Your total wealth so far.' ));
});



export {
    registerUser,
    loginUser,
    getAllUsers,
    authorization,
    logoutUser,
    finalizeMonth,
    getUserWealth
}