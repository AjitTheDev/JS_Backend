import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
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
    period:{
        type:String,
    },
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


export const Budget = mongoose.model("Budget",budgetSchema)