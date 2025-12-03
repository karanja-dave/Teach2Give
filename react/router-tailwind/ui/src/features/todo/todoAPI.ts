import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from"../../utils/ApiDomains"; //endpoint to hit backend
import type { RootState } from "../../app/store";


export type TypeTodo={
    todoid:number,
    todo_name:string,
    description:string,
    created_at:string,
    due_date: string,
    user_id:number,
    isComplete:boolean
}

export const todosAPI = createApi({
    reducerPath:"todosAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:ApiDomain,
        // Prepare Headers (for tokens to be used in authoriaton)
        prepareHeaders: (headers, {getState})=>{
            const token = (getState() as RootState).user.token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type','application/json');
            return headers
        }
    }),
    tagTypes:['Todos'],
    endpoints:(builder)=>({
        // create todos 
        createTodo:builder.mutation<TypeTodo,Partial<TypeTodo>>({
            query:(newTodo)=>({
                url:'/todos',
                method:'POST',
                body:newTodo
            }),
            invalidatesTags:['Todos']
        }),
        // get all todos 
        getTodos: builder.query<{data:TypeTodo[]},void>({ //void means no parameters are needed to fetch todos
            query:()=>'/todos',
            providesTags:['Todos'] //tells RTK that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created 
        }),
        // update todo 
        // delete todo 
    })
})