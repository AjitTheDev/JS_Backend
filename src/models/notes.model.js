import mongoose, { Schema } from "mongoose";



const noteSchema= new Schema(
    {
        id:{
            type:String,
            required:true,
            index:true,
            unique:true
        },
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,
            lowercase:true

        },
        createBy:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)


export const Notes =mongoose.model("Notes",noteSchema)