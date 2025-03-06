import { useGetTodosQuery } from "../store/todosApi";

export default function Todos () {
    const { data, error, isLoading } = useGetTodosQuery() 
    return <>
    {!isLoading && <div>{data.todos.map(({todo})=><div>{todo}</div>)}</div>
    
}
</>
}