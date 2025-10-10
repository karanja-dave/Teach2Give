
//load express package 
import express from 'express';

import { getPool } from './db/config'; //load getPool function defined in config={.ts file}
import { get } from 'http';
import { pool } from 'mssql';


// invocation - store all express functions and features inside the app object
const app = express()

// define the router handler function
app.get('/',(req,res)=>{ //since the req arg is not used replace it with an underscore instead
    res.send("Hello, the express server is up and running")
})

// define a port: it is the entry point to a server
const port=8081 //this is where the server will run

// deifine the listen fucntion- starts the express server and tells it to listen for requests on specified port
app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})

//fetch users  table
app.get('/users',(req,res)=>{ //this line defines the route
    getPool() //connect to database
    .then(pool=>{ //if successful connection;
        return pool.request().query('SELECT *FROM Users') //make request which is a querry to view the users table
    }).then(result=>{ //if sql querry is a success, result object is returned from sql server
        console.log("result",result); 
        //result.recordset contains array of rows from user table
        res.json(result.recordset) //sends data back to client in json format

    }).catch(err=>{ //if any error occurs(ie connection issue/sql syntax error);
        console.log("SQL error",err); //error is logged in the console
        res.status(500).send("Server Error") //server sends a 500 internal server error with response message "Server Error"
    })
})  


// fetch todo tables
app.get('/todos',(req,res)=>{
    getPool().then(pool=>{
        return pool.request().query('SELECT *FROM Todos')
    }).then(result=>{
        console.log("result",result);
        res.json(result.recordset)
    }).catch(err=>{
        console.log("SQL error",err);
        res.status(500).send("Server Error")
    })
}) 





//check if erver has successfully connect to DB, should be run before the codeblock above it 
getPool() // call function
    .then(()=>console.log("Database connected sucesfully")) //if successful connection print message in clg
    .catch((err:any)=>console.log("Database connection failed",err)) //else if error (no succesful connection), print mesage in clg and show type of error encountered