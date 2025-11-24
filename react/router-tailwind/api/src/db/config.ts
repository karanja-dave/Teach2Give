// load required packages
import dotenv from 'dotenv' //used to load variables from the .env file
import assert from 'assert' //used to check if allrequired variables exists
import sql from 'mssql'

//laod enviroment variables
dotenv.config()

// extract variables from the process.env
//ectracted variables are used to connect the express server with a DataBase
const{
    SQL_SERVER,
    SQL_USER,
    SQL_PWD,
    SQL_DB,
    PORT
}=process.env //process.env is an object that holds all enviroment variables 

/**
 * the above code(line 9-15) is shorthand for :
 *  const SQL_SERVER = process.env.SQL_SERVER;
    const SQL_USER = process.env.SQL_USER;
    const SQL_PWD = process.env.SQL_PWD;
    const SQL_DB = process.env.SQL_DB;
    const PORT = process.env.PORT;
    
 */

// ensure all enviroment variables are defined
assert(PORT,"PORT is required")
assert(SQL_SERVER,"SQL_SERVER is required")
assert(SQL_USER,"SQL_USER required")
assert(SQL_PWD,"SQL_PWD required")
assert(SQL_DB,"SQL_DB required")

// configuration object for DataBase connection 

export const config={ //create and export the config object
    port:PORT,
    sqlConfig:{ //define credentials required to connect to DataBase (mssql)
        user:SQL_USER,
        password:SQL_PWD,
        database:SQL_DB,
        server:SQL_SERVER,
        // pool is used to manage  multiple connections to a database 
        pool:{
            max:10, //max number of 10 connections at same time, each connection handles one query
            min:0, //no min number of connections
            idleTimeoutMillis: 30000  //closes a connection that is idle for 30 seconds 
        },
        options:{
            encrypt:true, //encrypts data transfered to and from SQL and express
            trustServerCertificate: true //tells driver to trust  server's certificate 
        }

    }
};

//getPool function is used to connect the Expres server to the MSQL database server
export const getPool =async () => { //create and export the getPool function

    try{//handles what happens on succesful connectionc
        const pool = await sql.connect(config.sqlConfig) //connect to SQL server and store the active connection in the pool object
        return pool; //return the pool object on succesfull connection that store the active connection 

    } catch(error) {//hanldes what happens on error encounter
        console.log("SQL Connection error",error) //message to be displayed on error 
        throw error //displays the error encountered
    }
}