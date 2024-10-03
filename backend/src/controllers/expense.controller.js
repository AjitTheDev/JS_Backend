import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const addExpense = asyncHandler(async(req,res)=>{

    const userId = req.userId;// User id, taking from authentication middleware

    const {amount, category, description, date, 
            paymentMethod, recurring, createdAt, updatedAt
    }  =  req.body

    const expenseDate = new Date(date);
    const month = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`; // E.g., '2024-09'

    const expense = await Expense.create({
        userId,
        amount,
        category,
        description,
        date,
        month,
        paymentMethod,
        recurring,
        createdAt,
        updatedAt
    })

    res.status(201)
    .json(new ApiResponse(200, expense, "Expense created successfully "))


})

const getAllExpenses = asyncHandler(async(req,res)=>{
    const allExpense = await Expense.find({})

    if(!allExpense){
        throw new ApiError(404, "Not record(s) found")
    }

    res.status(200)
    .json(new ApiResponse(200, allExpense, "Successfully fetched all the expense!!"))
})

const getUserExpense = asyncHandler(async(req,res)=>{
    const allExpense = await Expense.find({userId:req.userId})

    if(!allExpense){
        throw new ApiError(404, "Not record(s) found")
    }

    res.status(200)
    .json(new ApiResponse(200, allExpense, "Successfully fetched all the expense!!"))
})

const updateExpense = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {amount,paymentMethod,description,category,recurring} =req.body;
    
    const expense = await Expense.findOneAndUpdate({_id:id},
        {amount,paymentMethod,description,category,recurring},
        { new: true, runValidators: true }
    )
    res.status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully !!!"))
})

const getMonthlyExpense= asyncHandler(async(req,res)=>{
    const userId= req.userId;
    const { month } = req.query;

    const expense = await Expense.find({userId,month});

    if(!expense){
        throw new ApiError(404, `No record found for ${month}`)
    }

    res.status(200)
    .json(new ApiResponse(200, expense, `${month} expense retrieved successfully !!`))
})

const deleteExpense = asyncHandler(async(req,res)=>{

    const {id }= req.params
    const userId= req.userId
    const expense = await Expense.findOneAndDelete({_id:id,userId:userId});

    if (!expense) {
        throw new ApiError(404, "Expense not found or you don't have permission to delete it");
    }

    res.status(200)
    .json(new ApiResponse(200, `Expense ${id} deleted successfully !!!`))
})





export {
    addExpense,
    getAllExpenses,
    getUserExpense,
    updateExpense,
    deleteExpense,
    getMonthlyExpense
}