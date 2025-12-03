// import packages 
import { Request,Response } from "express"
// load defined and exported function from other modules
import { getPool } from "../db/config"
import *as todoServices from '../services/todo.service'


// controller to get all todo 
export const getTodos =async(req:Request,res:Response) =>{
    try{
        const todos=await todoServices.listTodos()
        res.status(200).json({data:todos})
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
        res.status(200).json(todo)
    } catch (error:any) {
        if(error.message=="Invalid todoid"){
            res.status(400).json({message:'Invalid todoid'})
        }else if(error.message=='Todo not found'){
            res.status(404).json({message:'Todo not found'})
        }else{
            res.status(500).json({error:"Internal Server error"})
        }
            
    }
}

// delete todo by id 
export const deleteTodo =async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)

    try {
        const result= await todoServices.deleteTodo(id) 
        res.status(204).json(result)
    } catch (error:any) {
        if(error.message=="Invalid todoid"){
            res.status(400).json({message:'Invalid todoid'})
        }else if(error.message=='Todo not found'){
            res.status(404).json({message:'Todo not found'})
        }else{
            res.status(500).json({error:"Internal Server error"})
        }
    }
}

// update todo 
export const updateTodo =async(req:Request,res:Response) =>{
    const id = parseInt(req.params.id);
    const todo =req.body  
    try {
        const result = await todoServices.updateTodo(id, todo)
        res.status(200).json(result)
    } catch (error:any) {
        if(error.message=="Invalid todoid"){
            res.status(400).json({message:'Invalid todoid'})
        }else if(error.message=='Todo not found'){
            res.status(404).json({message:'Todo not found'})
        }else{
            res.status(500).json({error:"Internal Server error"})
        }
        
    }
}
