import {useForm, type SubmitHandler} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import type { TypeTodo } from "../../../../features/todo/todoAPI"
import { useEffect } from 'react';
import { toast } from 'sonner';
import { todosAPI } from '../../../../features/todo/todoAPI';

type UpdateTodoProps={
    todo:TypeTodo|null //null is the re incase no todo is selected
};

type UpdateTodoInputs={
    todo_name:string,
    description:string,
    due_date:string,
    user_id:number,
    isCompleted:boolean,
};

const schema = yup.object({
    todo_name:yup.string().max(75,"Max 75 characters").required("Todo name requried"),
    description:yup.string().max(255,"Max 255 characters").required("Description is required"),
    user_id:yup.number().required("User Id is required").positive('User Id is Positive Integer').integer("User Id must be a number"),
    isCompleted:yup.boolean().default(false),
    due_date:yup.string().required("Due date is required")
});



export const UpdateTodo = ({todo}:UpdateTodoProps) => {
    const [UpdateTodo,{isLoading}]= todosAPI.useUpdateTodoMutation()
    // setup form wit validations and functionality to ctrl inputs 
    const {
        register, //registers all inputs in the form
        handleSubmit,
        reset, //what does it do
        setValue, //refills all form inputs with their current values 
        formState:{errors}            
        }=useForm<UpdateTodoInputs>({
            resolver:yupResolver(schema),
        });

    // populate form with the data to update : has a connection with setValue, know which one :where we invoke filling of existing records in update table
    useEffect(()=>{
        if(todo){
            setValue("todo_name",todo.todo_name)
            setValue('description',todo.description)
            setValue('user_id',todo.user_id)
            setValue('due_date',todo.due_date.slice(0,10))
            setValue('isCompleted',todo.isCompleted)
        // ensure form is empty if todo DNE     
        }else{
            reset()
        }
    },[todo,setValue,reset])
    // define onSubmit fun 
    const onSubmit:SubmitHandler<UpdateTodoInputs>=async(data)=>{
        console.log(data);
        try {
            if(!todo){
                toast.error("No Todo selected for update");
                return;
            }
            const response = await UpdateTodo({...data,id:todo.todoid})
            // console.log(response.data?.message);
            toast.success(response.data?.message);
            (document.getElementById('update_modal') as HTMLDialogElement).close()
        } catch (error:any) {
            // console.log(error);
            toast.error("Failed to Update Todo. Please try again.")
        }
    }
    return (
        <dialog id='update_modal' className='modal sm:modal-middle'>
            <div className='modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg'>
                <h3 className='font-bold text-lg mb-4'>Update Todo</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    {/* todo name input  */}
                    <input 
                        // data-test="edit-todo-name-input"
                        type="text" 
                        {...register('todo_name')}
                        placeholder='Todo Name'
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-600"
                    />
                    {errors.todo_name &&(
                        <span className='text-sm text-red-700'>{errors.todo_name.message}</span>
                    )}
                    {/* description input  */}
                    <textarea
                        data-test="edit-todo-description-input"
                        {...register("description")}
                        placeholder='Description'
                        className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-600"
                    >
                    </textarea>
                    {/* user id input  */}
                    <input
                        data-test="edit-todo-userid-input" 
                        type="number" 
                        {...register("user_id")}
                        placeholder='User Id'
                        className="input rounded w-full p-2 focus:ring-blue-500 text-lg bg-white text-gray-600"
                    />
                    {errors.user_id &&(
                        <span className='text-sm text-red-700'>{errors.user_id.message}</span>
                    )}
                    {/* date input  */}
                    <input
                        data-test="edit-todo-date-input"    
                        type="date"
                        {...register("due_date")}
                        className='input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-600'
                    />
                    {errors.due_date &&(
                        <span className='text-sm text-red-700'>{errors.due_date.message}</span>
                    )}
                    {/* isCompleted inpit  */}
                    <div className='form-control'>
                        {/* checkbox for completed status  */}
                        <label className='label cursor-pointer'>
                            <span className='label-text mr-4 text-white'>Status</span>
                            <div className='flex gap-4'>
                                <label className='flex items-center gap-1'>
                                    <input
                                        data-test="edit-todo-status-completed" 
                                        type='radio'
                                        value="true"
                                        {...register("isCompleted")}
                                        className='radio radio-primary text-green-400'
                                    />
                                    Completed
                                </label>
                                {/* checkbox for pending status  */}
                                <label className='flex items-center gap-1' >
                                    <input 
                                        data-test="edit-todo-status-pending"
                                        type="radio"
                                        value="false"
                                        {...register("isCompleted")}
                                        className='radio radio-primary text-yellow-400'
                                    />
                                    Pending
                                </label>
                            </div>
                        </label>
                    </div>

                    <div className="modal-action">
                        {/* submit btn   */}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                            >
                            {isLoading ? (
                                <>
                                <span className="loading loading-spinner"/>Updating...
                                </>
                            ) : "Update"}
                        </button>

                        <button className="btn" type="button" onClick={()=>{(document.getElementById('update_modal') as HTMLDialogElement).close();}}>
                            Close
                        </button>
            </div>
                </form>
            </div>

        </dialog>
    )
}
