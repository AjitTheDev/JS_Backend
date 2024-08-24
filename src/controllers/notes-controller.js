import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose';
import {Notes} from '../models/notes.model.js'


const createTodo = asyncHandler(async(req,res)=>{
    const {id,name, description,createdBy}= req.body;

    const todo= await Notes.create({
        id,
        name,
        description,
        createdBy
    })

    const createdTodo= await Notes.findById(todo._id)

    return res.status(201).json(
        new ApiResponse(200,createdTodo,"Todo Created successfully !!")
    )
})


const getTodoList = asyncHandler(async(req,res)=>{
    try{
        const todoList= await Notes.aggregate([
            {$match:{}}
        ])

        if(todoList.length>0){
            return res.status(200).json(
                new ApiResponse(200, todoList,"Todo list sucessfully fetched !!")
            )
        }else{
            throw new ApiError(404, "No record found")
        }

       

    }catch(error){
        throw new ApiError(500, 'Internal server error !!')
    }
    
})

const getByName =asyncHandler(async(req,res)=>{
    const {name}= req.params
    if(!name){
        throw new ApiError(400, "Name is required !!")
    }
    const todo=await Notes.findOne({name:name})
    if (!todo) {
        throw new ApiError(404, "Record not found !!");
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,todo," Record found successfully !!!"
    ))

})

const deleteTodo=asyncHandler(async(req,res)=>{
        const {id} = req.params;
        if(!id){
            throw new ApiError(400, "Id is required")
        }

        const todo=await Notes.findOneAndDelete({id:id})
        console.log('toodd delete',todo)
        if(!todo){
            throw new ApiError(404, "Record not found !!")
        }

        return res
        .status(200)
        .json(new ApiResponse(
            200, todo," Record successfully deleted !!"
        ))
})

const updateTodo= asyncHandler(async(req,res)=>{
    const { id } = req.params; // Get id from query params
    const {name,description} =req.body
    console.log('eee',req.body,req.params)

    const todo= await Notes.findOneAndUpdate(
        {id: id},
        { name, description },  // Fields to update
        { new: true, runValidators: true }
     )
        console.log('toodd upda',todo)
        
    if(!todo){
        throw new ApiError(404, "Record not found !!!")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,todo,"Record updated successfully !!!"
    ))


})

export{
    createTodo,
    getTodoList,
    getByName,
    deleteTodo,
    updateTodo
}