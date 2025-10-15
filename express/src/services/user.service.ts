import { error } from 'console';
import * as userRepositories from '../repositories/user.repository'
import { NewUser, UpdateUser } from '../types/user.types';
import jwt from 'jsonwebtoken'
import bcrpt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config() //loads all variables in the .env  file

export const listUsers = async () => await userRepositories.getUsers();
export const getUser = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    return await ensureUserExists(id);

}

// where we will be with hashing the password 
export const createUser = async (user: NewUser) => {
    // hash pass b4 saving 
    if(user.password){
        user.password = await bcrpt.hash(user.password,10) //we carry out 10 salt rounds
        console.log("hashed password",user.password) //print the hashed password on console log
    }



    return await userRepositories.createUser(user);
}

//export const updateUser = async (id: number, user: any) => await userRepositories.updateUser(id, user);
export const updateUser = async (id: number, user: UpdateUser) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    await ensureUserExists(id);
    return await userRepositories.updateUser(id, user);
}
// export const deleteUser = async (id: number) => await userRepositories.deleteUser(id);
export const deleteUser = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    await ensureUserExists(id);
    return await userRepositories.deleteUser(id);
}

//Reusable function to check if user exists
const ensureUserExists = async (id: number) => {
    const user = await userRepositories.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

// user login function 
export const loginUser = async (email:string, password:string)=>{
    const user =await userRepositories.getUserByEmail(email)
    if (!user){ //if user DNE in DB
        throw new Error('User not found')
    }
    // compare if pass is same as one in DB -
    // Nb: The logged in pass is encrypted and its hash is compared by that stored in the DB
    const isMatch =await bcrpt.compare(password,user.password)
    if(!isMatch){ // if hashed pass are not same
        throw new Error('Invalid credentials')

    }
    // create JWT payload - used to create the JWT token
    const payLoad={
        sub:user.userid, //should be a unique variable in the DB hence user_id
        first_name:user.first_name,
        last_name:user.last_name,
        exp:Math.floor(Date.now() / 1000+60*60) //token expires after 1 hour
    }

    // genertae a token 
    const secret= process.env.JWT_SECRET as string
    if(!secret) throw new Error('JwT is not defind')
    
    const token=jwt.sign(payLoad,secret) //token to be used as card.identification card 

    // return successful login 
    return{
        message: 'Login successfull',
        token,
        user:{ //helps you have record of logged in users 
            userid:user.userid,
            FN:user.first_name,
            LN:user.last_name,
            email:user.email,
            PN:user.phone_number


        }
    }
}