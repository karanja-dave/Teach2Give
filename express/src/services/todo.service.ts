

// import defined functions imported from other modules 
import *as todoRepositories from '../repositories/todo.repository'

// get all todos
export const listTodos = async()=> await todoRepositories.getAllTodos()

//add todos
export const createTodo=async(newtodo:any)=>await todoRepositories.createTodo(newtodo)

export const getTodo= async(id:number) => { //handling logics in the service 
    const existingtodo = await todoRepositories.getTodoById(id)
    if(!existingtodo){
        throw new Error('Todo not found')
    }
    return existingtodo;
}