import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'

// load env variables format.env file 
dotenv.config()

// middleware function to check if user is authenticated/logged in :using token provided on log in
export const isAuthenticated=(req:Request,res:Response,next:NextFunction)=>{

    // extract token stored in the header of requests 
    //it is the same token provided to the user on log in
    const authHeader=req.headers.authorization;

    // if token DNE or if token exist but does not beging with Bearer then return unauthoried 
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({message:'Unauthorized'})
        return;
    }

    const token=authHeader.split(' ')[1]
    // confirm if you've extracted only the token
    if(!token){
        res.status(401).json({message:'Unauthorized'})
        return;
    }
    // verify if extracted token is same as that provided by jwt 
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);
        // attach user data 
        (req as any).user = decode;
        next()
    } catch (error) {
        res.status(401).json({message:'Unauthorized'})
        
    }

}