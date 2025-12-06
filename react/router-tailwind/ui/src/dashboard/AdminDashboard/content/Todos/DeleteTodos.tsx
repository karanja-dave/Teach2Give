import { toast } from "sonner"
import { todosAPI, type TypeTodo } from "../../../../features/todo/todoAPI"

type DeleteTodoProps={
    todo:TypeTodo|null
}
export const DeleteTodos = ({todo}:DeleteTodoProps) => {
    // definations
    const [deleteTodo,{isLoading}]=todosAPI.useDeleteTodoMutation()

    // define the delete function 
    const handleDelete =async()=>{
        try {
            if(!todo){
                toast.error("No Todo selected for deletion")
                return;
            }
            await deleteTodo(todo.todoid)
            toast.success("Todo delete successfully");
            // close modal
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close()
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete todo. Please try again");
        }
    }

  return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
        <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
            <h3 className="font-bold text-lg mb-4 ">Delete Todo</h3>
            <p className="mb-6">
                Are you sure you want to delete <span className="font-semibold">{todo?.todo_name}</span>?
            </p>
            <div className="modal-action flec gap-4">
                {/* delete button  */}
                <button
                    data-test="delete-todo-confirm-button"
                    className="btn btn-error"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    {isLoading?(
                        <>
                        <span className="loading loading-spinner text-primary"/> Deleting
                        </>
                    ):"Yes, Delete"}
                </button>
                {/* cancellation button  */}
                <button
                    className="btn"
                    type="button"
                    onClick={()=>(document.getElementById('delete_modal')as HTMLDialogElement)?.close()}
                >
                    Cancel


                </button>
            </div>
        </div>
    </dialog>
    )
}
