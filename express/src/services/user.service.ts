import * as userRepositories from '../repositories/user.repository'
import { NewUser, UpdateUser } from '../types/user.types';
import bcrpt from 'bcrypt'

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