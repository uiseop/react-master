import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function ToDoList() {
  const todos = useRecoilValue(toDoState);
    return (
        <div>
            <h1>ToDos</h1>
            <hr />
            <CreateTodo />
            <ul>
              {todos.map((todo => <Todo key={todo.id} {...todo} />))}
            </ul>
        </div>
    );
}

export default ToDoList;
