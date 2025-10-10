// here we define all the routes ie fetch all, one, two, specific  todos records.

// define route to fetch all todo records 

// load packages
import { Express } from "express"; 

//load functions defined and exported from other modules
import * as todoController from '../controllers/todo.controllers' //import all funs in the todo.controllers.ts file


const todoRoutes=(app:Express)=>{ //defines a fun that takes the Express app as an argument and attaches routes to the existing app from index.ts.
    app.get('/alltodos',todoController.getTodos)
    app.post('/addtodo',todoController.createTodo)
}

export default todoRoutes //allows us to import  this fun to other modules