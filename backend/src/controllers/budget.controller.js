import { Budget } from "../models/budget.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addBudget = asyncHandler(async(req,res)=>{
    const {amount, category, period, createdAt, updatedAt}= req.body;

    const userId = req.userId;

    const budget = await Budget.create({
        userId,
        amount,
        category,
        period,
        createdAt,
        updatedAt
    })

    if(!budget){
        throw new ApiError(400, "Something went wrong, while creating budget.")
    }

    res.status(201)
    .json(new ApiResponse(200, budget, "Budget created successfully !! "))

})

const getUserBudget = asyncHandler(async(req,res)=>{
    const userId = req.userId;

    const userBudget = await Budget.find({userId:userId});

    if(!userBudget){
        throw new ApiError(404, "Budget not found for this user !!")
    }

    res.status(200)
    .json(new ApiResponse(200, userBudget, "Successfully fetched all the record(s) !!"))
})

const updateUserBudget = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {amount, category, period} = req.body;

    const updatedBugdet = await Budget.findOneAndUpdate({_id:id},{
        amount:amount,
        category:category,
        period:period
    },{ new: true, runValidators: true })

    if(!updatedBugdet){
        throw new ApiError(400, "Something went wrong !!")
    }

    res.status(200)
    .json(new ApiResponse(200, updatedBugdet, "Budget updated successfully !!"))

})

const deleteUserBudget = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const deletedBudget = await Budget.findOneAndDelete({_id:id});

    if(!deletedBudget){
        throw new ApiError(404, "Record not found !!")
    }

    res.status(200)
    .json(new ApiResponse(200, `Budget ${id} has deleted successfully`));

})

export {addBudget,getUserBudget,updateUserBudget,deleteUserBudget}