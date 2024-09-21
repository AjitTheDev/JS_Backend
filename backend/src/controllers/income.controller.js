import { Income } from "../models/income.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addIncome = asyncHandler(async(req,res)=>{
    const userId = req.userId;

    const {amount,
        source,
        description,
        date,recurring,
        createdAt,updatedAt } = req.body;

    const income = await Income.create({
        userId,
        amount,
        source,
        description,
        date,recurring,
        createdAt,updatedAt
    })

    if(!income){
        throw new ApiError(400,"Something went wrong, while creating Income");
    }

    res.status(201)
    .json(new ApiResponse(200, income, "income created successfully "));
})

const getUserIncome = asyncHandler(async(req,res)=>{
    const userId = req.userId;

    const userIncome = await Income.find({userId:userId});

    if(!userIncome){
        throw new ApiError(404, "Record(s) not found")
    }

    res.status(200)
    .json(new ApiResponse(200, userIncome, "Successfully fetched all user income"))

})

const updateUserIncome = asyncHandler(async(req, res)=>{
    const {id} = req.params 

    const {amount, source, description, recurring} = req.body;

    const updatedUserIncome = await Income.findOneAndUpdate({_id:id},
       {amount,source, description, recurring},
       { new: true, runValidators: true }
    )

    if(!updatedUserIncome){
        throw new ApiError(400, "Something went wrong, while updating income")
    }

    res.status(200)
    .json(new ApiResponse(200, updatedUserIncome, "Income updated successfully !!"))
})

const deleteUserIncome = asyncHandler(async(req, res)=>{
    const {id} = req.params 
    const deletedIncome = await Income.findOneAndDelete({_id:id});

    if(!deletedIncome){
        throw new ApiError(404, "Record doesn't exists or you dont have access to delete the record")
    }

    res.status(200)
    .json(new ApiResponse(200, `Income ${id} deleted successfully !!`))
})


export {addIncome,getUserIncome,updateUserIncome,deleteUserIncome}