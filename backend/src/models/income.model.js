import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true // E.g. 'Salary', 'Investment', 'Freelance', etc.
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    recurring: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
},
    {timestamps:true}
)

export const Income = mongoose.model("Income",incomeSchema)