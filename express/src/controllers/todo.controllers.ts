// import packages 
import { Request,Response } from "express"
// load defined and exported function from other modules
import { getPool } from "../db/config"


// bad practice (very common)for controllers-this controller is doing everything

// function connects to sql database, executes SQL query to fetch all records in the Todos table and returns records in json format 
// the controller should not be used toexecute logic and querries 
export const getAllTodosontroller =async(req:Request,res:Response) =>{
    try{
        const pool = await getPool() //await db connection to open
        const results = await pool.request().query('SELECT *FROM Todos')
        res.status(200).json(results.recordset)
    } catch(error){
        res.status(500).json({error:'Internal Server Error'})
    }
}

// function inserts new records to the todo table 
// the browser should be used only to get requests and return responses not create or add items, thus this is also a bad practice  
export const AddTodoController =async(req:Request,res:Response)=>{
    // client requesting to add a new to do item, col_names should be same like that in the todo table 
    const {todo_name,description,due_date,user_id}=req.body;
    try {
        const pool=await getPool(); //connect to DB
        await pool
        .request() //create a ne sqql request

        // take client inouts as parameters to avoid SQL penetration 
        .input('todo_name',todo_name)
        .input('description',description)
        .input('due_date', due_date)
        .input('user_id',user_id)
        // exectue SQL insert statment  to add new todo to database 
        .query('INSERT INTO Todos (todo_name,description,due_date,user_id) VALUES (@todo_name, @description, @due_date, @user_id)')
        //send a success repone that record was added to the database
        res.status(201).json({message:'Todo Created successfully'})

    } catch (error) { //handles server errors
        res.status(500).json({error:'Internal server error'})
        
    }
}
