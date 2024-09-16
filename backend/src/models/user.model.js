
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

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
       // required:true,
    },
    emailNotification:{
        type:Boolean,
       // required:true,
    },
    
},{
    timestamps:true
})


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect= async function (password){
    console.log(password,this.password)
    return await bcrypt.compare(password,this.password)
}


export const User = mongoose.model("User",userSchema)