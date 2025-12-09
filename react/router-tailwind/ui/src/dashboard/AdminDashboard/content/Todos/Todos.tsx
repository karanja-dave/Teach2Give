import { todosAPI, type TypeTodo    } from "../../../../features/todo/todoAPI"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CreateTodo } from "./CreateTodo";
import { useState } from "react";
import { DeleteTodos } from "./DeleteTodos";
import { UpdateTodo } from "./UpdateTodo";

export const Todos = () => {
  // use state for updating 
  const [selectedTodo, setSelectedTodo]=useState<TypeTodo|null>(null);
  // use state for deletetion 
  const [todoDelete, setTodoToDelete]=useState<TypeTodo|null>(null);
  const {data: todosData, isLoading:todosLoading, error:todoError} = todosAPI.useGetTodosQuery()
    // console.log(todosData);
     
  return (
    <div>
      {/* create todo button   */}
      <div className="flex justify-center mb-3 mt-3">
        <button 
          className="btn bg-gray-600 text-white hover:bg-gray-700 border-gray-400 rounded-lg px-4 text-lg"
          onClick={()=>(document.getElementById('create-todo') as HTMLDialogElement).showModal()}>
          Create Todo
        </button>
      </div>
      {/* call the create todo form  */}
      <CreateTodo/> 
      <DeleteTodos todo={todoDelete}/>
      <UpdateTodo todo={selectedTodo}/>
      {/* tell user to wait as todos are fetched from Db- can have a spinner instead  */}
      {todosLoading && <p>Todos Loading...</p> }
      {/* handling errors  */}
      {todoError && <p className="text-red-500">Error Fetching Todos</p> }

      {/* fetch todos  */}
      {todosData && todosData.data && todosData.data.length>0 ? (
        <div className="md:overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Todo Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
              {/* <th className="px-4 py-2">Actions</th> */}
            </thead>
            <tbody>
              {todosData.data.map((todo:TypeTodo)=>(
                // heres where we have the table rows 
                <tr key={todo.todoid} className="hover:bg-gray-300 border-b border-gray-400" >
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base" >{todo.todo_name}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{todo.description}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{new Date(todo.due_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                    
                      {
                        todo.isCompleted ? (
                          <span className="badge badge-success">Complete</span>
                        ):(
                          <span className="badge badge-warning">Pending</span>
                        )

                      }
                  </td>
                  <td className="px-4 py-2 flex">
                    {/* update button  */}
                    <button className="btn btn-sm btn-primary mr-4"
                      onClick={()=>{
                        setSelectedTodo(todo); //passes respective todo item to be used by the child
                        (document.getElementById('update_modal') as HTMLDialogElement).showModal();
                      }}
                    >
                      <FaEdit size={20}/>
                    </button>
                    {/* delete button  */}
                    <button className="btn btn-sm btn-danger text-red-500"
                        onClick={()=>{
                          setTodoToDelete(todo);
                          (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
                        }}  
                    >
                      <MdDeleteForever size={20}/>
                    
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ):(
        <p>No Todos Found</p>
      )}
    </div>
  )
}
