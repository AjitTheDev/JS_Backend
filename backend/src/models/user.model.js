
import mongoose from "mongoose"

const userSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
    },
    accountStatus:{
        type:Boolean,
    },
    defaultLanguage:{
        type:String,
    },
    loginAttempts:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpiry:{
        type:String,
    },
    totalExpenses:{
        type:Number,
    },
    budgetLimit:{
        type:Number,
        required:true,
    },
    emailNotification:{
        type:Boolean,
        required:true,
    },
    
},{
    timestamps:true
})


export const User = mongoose.model("User",userSchema)