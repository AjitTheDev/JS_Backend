import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { Income } from "../models/income.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getRecentHistory = asyncHandler(async(req,res)=>{
    const userId = req.userId;

    const recentExpense = await Expense.find({userId:userId})
    .sort({createdAt:-1}) // Sort by creation date, most recent first
    .limit(10); // Limit to last 10 expense records

    const recentIncome = await Income.find({userId:userId})
    .sort({createdAt:-1})
    .limit(10);

    // Combine income and expenses into a single array
    const recentHistory = [
        ...recentIncome.map(record=>({...record.toObject(), type:'income'})),
        ...recentExpense.map(record=>({...record.toObject(), type:'expense'})),
    ]

    // Sort combined array by date
    recentHistory.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))

    // Limit to the most recent 10 or desired number of records
    const limitedHistory = recentHistory.slice(0,10);

    res.status(200)
    .json(new ApiResponse(200, limitedHistory, "Fetched recent history transactions"))
})

export {getRecentHistory}