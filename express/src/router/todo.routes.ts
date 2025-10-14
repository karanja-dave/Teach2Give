// here we define all the routes ie fetch all, one, two, specific  todos records.

// define route to fetch all todo records 

// load packages
import { Express } from "express"; 

//load functions defined and exported from other modules
import * as todoController from '../controllers/todo.controllers' //import all funs in the todo.controllers.ts file


const todoRoutes=(app:Express)=>{ //defines a fun that takes the Express app as an argument and attaches routes to the existing app from index.ts.
    // retrieve all data  route
    app.get('/todos',todoController.getTodos)
    // add data route 
    app.post('/todos',todoController.createTodo)
    // get todo record by id 
    app.get('/todos/:id',todoController.getTodoById)

    // put -update record
    app.put('/todos/:id',todoController.updateTodo)
    // delete 
    app.delete('/todos/:id',todoController.deleteTodo)
}

export default todoRoutes //allows us to import  this fun to other modules