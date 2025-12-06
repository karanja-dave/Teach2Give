// this file defined the datatype of objects we've used in the project 

// types for new todo object 
export interface NewTodo {
    todo_name:string;
    description:string;
    due_date: string;
    user_id:number;
    isCompleted:boolean
}

// types for the update todo object 
export interface UpdateTodo { // the '?' means one can or not provide the values of the variables ending with "?"
    todo_name?:string;
    description?:string;
    due_date?: string;
    user_id?:number;
    isCompleted?:boolean;
}

// types for todo items 
export interface Todo {
    todoid:number;
    todo_name:string;
    description:string;
    created_at:string
    due_date: string;
    user_id:number;
}