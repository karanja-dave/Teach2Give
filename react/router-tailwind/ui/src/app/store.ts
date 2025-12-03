// configure the store 

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/es/storage";
import { userApi } from "../features/auth/userAPI"
import { persistReducer, persistStore } from "redux-persist"
import { loginAPI } from "../features/auth/loginAPI";
import userSlice from '../features/auth/userSlice'
import { todosAPI } from "../features/todo/todoAPI";

const persistConfig ={
    key:'todostore', //label used to identify and update a store default is root
    version:1,
    storage,
    whitelist:['user'] //persists user data in the store, 'user' is the slice label we defined in the userSlice
}

// combine all reducers into 1 route 
const rootReducer = combineReducers({
    [userApi.reducerPath]:userApi.reducer,
    [loginAPI.reducerPath]:loginAPI.reducer,
    [todosAPI.reducerPath]:todosAPI.reducer,
    user:userSlice
})


export const persistedReducers = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
         serializableCheck:false
    })
    .concat(userApi.middleware)
    //concat other middlewares below
    .concat(loginAPI.middleware)
    .concat(todosAPI.middleware)
 })

 export const persistedStore = persistStore(store)
 export type RootState = ReturnType<typeof store.getState>