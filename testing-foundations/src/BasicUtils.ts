import { IAuthData } from "./authData";


// product function 
export function product(a:number,b:number):number{
    return a * b;
}

// function to authenticate a user 
export function  authenticateUser(username:string,password:string):IAuthData{
    // simulate authentication logic
    const authStatus = username === 'deveLOPER' && password ==='dev' //then authStatus stores true

    return{
        usernameToLower:username.toLocaleLowerCase(),
        usernameCharacters:username.split(""),
        userDetails:{name:'developer',role:'admin'},
        isAuthenticated:authStatus
    }
}

