export interface User {
    userid: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password:string;
    role:string;
    is_verified?:boolean;
    verification_code?:string|null;
}

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password:string;
    role?:string;
}

// update user type
export interface UpdateUser {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    password:string;
    role?:string
}