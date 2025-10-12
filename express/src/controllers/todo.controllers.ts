// import packages 
import { Request,Response } from "express"
// load defined and exported function from other modules
import { getPool } from "../db/config"
import *as todoServices from '../services/todo.service'

// controller to get all todo 
export const getTodos =async(req:Request,res:Response) =>{
    try{
        const todos=await todoServices.listTodos()
        res.status(200).json(todos)
    } catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
}

//add todo
export const createTodo =async(req:Request,res:Response)=>{
    try {
        const newtodo =req.body;
        const result = await todoServices.createTodo(newtodo)
        //send a success repone that record was added to the database
        res.status(201).json(result)

    } catch (error:any) { //handles server errors
        res.status(500).json({error:'Internal server error'})
        
    }
}

// get todo by id 
export const getTodoById = async (req:Request,res:Response) => {
    const id= parseInt(req.params.id)
    try {
        const todo = await todoServices.getTodo(id)
        if(todo){
            res.status(200).json(todo) //return the todo
        }else{
            res.status(404).json({message:"Todo not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server error"})
        
        
    }
}
