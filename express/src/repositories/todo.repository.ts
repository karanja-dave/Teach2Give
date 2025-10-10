
// import defined functions exported from other modules 
import { getPool } from "../db/config";

// get all todos 
export const getAllTodos = async()=>{
    const pool = await getPool() //await db connection to open
    const results = await pool.request().query('SELECT *FROM Todos')
    return results.recordset
}

//create new todo
export const createTodo = async(newtodo:any)=>{
    const pool= await getPool(); //connect to DB
        await pool
        .request() //create a ne sqql request

        // take client inouts as parameters to avoid SQL penetration 
        .input('todo_name',newtodo.todo_name)
        .input('description',newtodo.description)
        .input('due_date', newtodo.due_date)
        .input('user_id',newtodo.user_id)
        // exectue SQL insert statment  to add new todo to database 
        .query('INSERT INTO Todos (todo_name,description,due_date,user_id) VALUES (@todo_name, @description, @due_date, @user_id)')
        return {message:"Todo created successfully"}


}