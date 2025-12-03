import { todosAPI    } from "../../../../features/todo/todoAPI"


export const Todos = () => {
    const {data: todosData, error:todoError} = todosAPI.useGetTodosQuery()
    console.log(todosData);
     
  return (
    <div>

    </div>
  )
}
