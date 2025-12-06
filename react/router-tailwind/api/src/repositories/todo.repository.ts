
// import defined functions exported from other modules 
import { getPool } from "../db/config";
import { NewTodo, UpdateTodo,Todo } from "../types/todo.types";

// get all todos 
export const getAllTodos = async():Promise<Todo[]> =>{
    const pool = await getPool() //await db connection to open
    const results = await pool.request().query('SELECT *FROM Todos')
    return results.recordset
}

//create new todo
export const createTodo = async(newtodo:NewTodo)=>{
    const pool= await getPool(); //connect to DB
        await pool
        .request() //create a ne sqql request

        // input() safley passes users input as parameters to SQL query to avoid penetration 
        .input('todo_name',newtodo.todo_name)
        .input('description',newtodo.description)
        .input('due_date', newtodo.due_date)
        .input('user_id',newtodo.user_id)
        .input('isCompleted',newtodo.isCompleted)
        // exectue SQL insert statment  to add new todo to database 
        .query('INSERT INTO Todos (todo_name,description,due_date,user_id,isCompleted) VALUES (@todo_name, @description, @due_date, @user_id, @isCompleted)')
        return {message:"Todo created successfully"}


}

// get todo by id 
export const getTodoById=async(id:number):Promise<Todo>=>{
    const pool= await getPool();
    const result = await pool
    .request()
    .input('id',id)
    .query('SELECT *FROM Todos WHERE todoid=@id')
    return result.recordset[0]
}

// delete todo 
export const deleteTodo =async(id:number)=>{
    const pool = await getPool();
    await pool
    .request()
    .input('id',id)
    .query('DELETE FROM Todos WHERE todoid=@id')
    return
}

// put -update todo 
export const updateTodo = async(id:number,todo:UpdateTodo)=>{
    const pool = await getPool();
    await pool.request()
        .input('id',id)
        .input('todo_name',todo.todo_name)
        .input('description',todo.description)
        .input('due_date',todo.due_date)
        .input('user_id',todo.user_id)
        .input('isCompleted',todo.isCompleted)
        .query('UPDATE Todos Set todo_name=@todo_name, description=@description, due_date=@due_date, user_id=@user_id, isCompleted=@isCompleted WHERE todoid=@id')
    return{message:'Todo updated successfully'}
}