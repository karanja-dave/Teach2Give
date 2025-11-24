import { error } from 'console';
import * as userRepositories from '../repositories/user.repository'
import { NewUser, UpdateUser } from '../types/user.types';
import jwt from 'jsonwebtoken'
import bcrpt from 'bcrypt'
import dotenv from 'dotenv'
import { sendEmail } from '../mailer/mailer';
import { emailTemplate } from '../mailer/emailTemplate';


dotenv.config() //loads all variables in the .env  file

//Reusable function to check if user exists
const ensureUserExists = async (id: number) => {
    const user = await userRepositories.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
// get all users 
export const listUsers = async () => await userRepositories.getUsers();
// get user by id 
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
    // save new user to DB 
    const result = await userRepositories.createUser(user);
    // generate random verification code 
    const verifcationCode = Math.floor(100000 + Math.random() * 900000).toString() //random code is between 100-900k 

    await userRepositories.setVerificationCode(user.email,verifcationCode)

    // send verification code via email 
    await sendEmail(
        user.email,
        'Verify your Email for Todo App',
        emailTemplate.verify(user.first_name,verifcationCode)
    )

    return {message:'User created successfully. Verifcation code sent to EMail.'}
}

// verification of new users 
export const verifyUser = async (email:string,code:string)=>{
    const user= await userRepositories.getUserByEmail(email) //check if user exists using their email

    if(!user){
        throw new Error('User not found')
    }
    if(user.verification_code !== code){
        throw new Error('Invalid verification code');
    }
    await userRepositories.verifyUser(email)

    // send email to tell them they are verified 
    await sendEmail(
        user.email,
        'Your Email has been verified - Todo App',
        emailTemplate.verifiedSuccess(user.first_name)
    )
    return {message:"User verified successfully"}
}

//export const updateUser = async (id: number, user: any) => await userRepositories.updateUser(id, user);
export const updateUser = async (id: number, user: UpdateUser) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    await ensureUserExists(id);
    // hash updated passwords 
    if(user.password){
        user.password = await bcrpt.hash(user.password,10) //we carry out 10 salt rounds
        console.log("hashed password",user.password) //print the hashed password on console log
    }
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
        role:user.role, //critical for role based authentication
        exp:Math.floor(Date.now() / 1000+60*60) //token expires after 1 hour
    }

    // generate a token 
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