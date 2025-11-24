import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'

// load env variables format.env file 
dotenv.config()

// middleware that checks not only authenticated users but also their roles 
export const checkRoles = (requiredRole:'admin'| 'user' | 'both')=>{
    return(req:Request,res:Response,next:NextFunction)=>{

        const authHeader= req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            res.status(401).json({message:'Unauthoried'});
            return
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
            // attach user request 
            (req as any).user=decoded;

            // if token is valid check for roles 
            // below is an example of how decoder should look like
            // {
            //     id:'some-unique-id',
            //     role:'admin|user|both',
            //     iat:1697059200 //issued at
            //     exp:1697062800 //expiration time 
            // }
            // checks if decoded object has no issues 
            if(typeof(decoded)==='object' && decoded !==null && "role" in decoded){
                // authorie both 
                if(requiredRole==='both'){
                    if(decoded.role==='admin'||decoded.role==='user'){
                        next()
                        return;
                    }
                // for 
                } else if(decoded.role===requiredRole){ //check user, admin roles: returns error for undefiend roles
                    next()
                    return
                }
                res.status(401).json({message:'Unauthoried'})
                return
            } else{ // decoded object has an issue 
                res.status(401).json({message:"Invalid Token Payload"})
                return
            }
            
        } catch (error:any) {
            res.status(401).json({message:'Invalid Token'})
            return
            
        }
    }
}

// export authoriation function for each role to be used in router to ensure each role can only access what they are authoried to 
export const adminOnly = checkRoles('admin')
export const userOnly = checkRoles('user')
export const adminUser = checkRoles('both')