
//load express package 
import express from 'express';

// invocation - store all express functions and features inside the app object
const app = express()

// define the router handler function
app.get('/test',(req,res)=>{ //since the req arg is not used replace it with an underscore instead
    res.send("Hello, the express server is up and running")
})

// define a port: it is the entry point to a server
const port=8081 //this is where the server will run

// deifine the listen fucntion- starts the express server and tells it to listen for requests on specified port
app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})