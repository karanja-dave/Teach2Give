

// import defined functions imported from other modules 
import { error } from 'console'
import *as todoRepositories from '../repositories/todo.repository'
import { NewTodo, UpdateTodo } from '../types/todo.types'

// get all todos
export const listTodos = async()=> await todoRepositories.getAllTodos()

//add todos
export const createTodo=async(newtodo:NewTodo)=>await todoRepositories.createTodo(newtodo)

export const getTodo= async(id:number) => { //handling logics in the service 
    // bad requests 
    if (isNaN(id)){
        throw new Error('Invalid todoid')
    }
    const existingtodo = await todoRepositories.getTodoById(id)
    if(!existingtodo){
        throw new Error('Todo not found')
    }
    return existingtodo;
}

// delete todo 
export const deleteTodo = async(id:number)=> {
    // bad requests 
    if (isNaN(id)){
        throw new Error('Invalid todoid')
    }
    const existingtodo = await todoRepositories.getTodoById(id)
    if(!existingtodo){
        throw new Error('Todo not found')
    }
    return await todoRepositories.deleteTodo(id);
}

// update todo 
 export const updateTodo =async(id:number,todo:UpdateTodo)=>{
    // bad requests 
    if (isNaN(id)){
        throw new Error('Invalid todoid')
    }
    const existingtodo = await todoRepositories.getTodoById(id)
    if(!existingtodo){
        throw new Error('Todo not found')
    }
    return await todoRepositories.updateTodo(id,todo);
 }