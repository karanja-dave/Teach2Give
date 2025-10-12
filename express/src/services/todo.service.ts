

// import defined functions imported from other modules 
import *as todoRepositories from '../repositories/todo.repository'

// get all todos
export const listTodos = async()=> await todoRepositories.getAllTodos()

//add todos
export const createTodo=async(newtodo:any)=>await todoRepositories.createTodo(newtodo)

export const getTodo= async(id:number) => await todoRepositories.getTodoById(id);