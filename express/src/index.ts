
//load express package 
import express from 'express';
import dotenv from "dotenv" 

//load functions defined and exported from other modules
import { getPool } from './db/config'; //load getPool function defined in config={.ts file}
import todoRoutes from './router/todo.routes';
import userRoutes from './router/user.routes';



// invocation - store all express functions and features inside the app object
const app = express()

// middleware - ensures you parse json request body
app.use(express.json());

//loads variables in the .env file
dotenv.config()

// define the router handler function
app.get('/',(req,res)=>{ //since the req arg is not used replace it with an underscore instead
    res.send("Hello, the express server is up and running")
})

// register routes :define routes
todoRoutes(app) //pass the app object to todoRoutes so that it can attach its routes
userRoutes(app)


// define a port: it is the entry point to a server
const port=process.env.PORT||8081 //serve will run on port specified in the .env file or its alternative 8081

// deifine the listen fucntion- starts the express server and tells it to listen for requests on specified port
app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})

getPool() // call function
    .then(()=>console.log("Database connected sucesfully")) //if successful connection print message in clg
    .catch((err:any)=>console.log("Database connection failed",err)) //else if error (no succesful connection), print mesage in clg and show type of error encountered