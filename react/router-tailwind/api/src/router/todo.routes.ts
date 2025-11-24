// here we define all the routes ie fetch all, one, two, specific  todos records.

// define route to fetch all todo records 

// load packages
import { Express } from "express"; 

//load functions defined and exported from other modules
import * as todoController from '../controllers/todo.controllers' //import all funs in the todo.controllers.ts file
import { adminOnly,userOnly,adminUser } from "../middleware/bearAuth";


const todoRoutes=(app:Express)=>{ //defines a fun that takes the Express app as an argument and attaches routes to the existing app from index.ts.
    // retrieve all data  route
    app.get('/todos', adminOnly, todoController.getTodos)
    // add data route 
    app.post('/todos', userOnly, todoController.createTodo)
    // get todo record by id 
    app.get('/todos/:id', adminUser,todoController.getTodoById)

    // put -update record
    app.put('/todos/:id', userOnly,todoController.updateTodo)
    // delete 
    app.delete('/todos/:id', adminOnly,todoController.deleteTodo)
}

export default todoRoutes //allows us to import  this fun to other modules