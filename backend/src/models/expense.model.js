import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    month: {
        type: String, // E.g., '2024-09'
        required: true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    recurring:{
        type:Boolean
    },
    // createdDate:{
    //     type:String
    // },
    // updatedDate:{
    //     type:String
    // }
    createdAt: {
        type: Date, // Store as a Date object
        default: Date.now, // Automatically set the default date
    },
    updatedAt: {
        type: Date, // Store as a Date object
        default: Date.now, // Automatically set the default date
    }
},{
    timestamps:true
})


export const Expense = mongoose.model("Expense", expenseSchema)