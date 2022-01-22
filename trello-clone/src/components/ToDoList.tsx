import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

function ToDoList() {
    const [toDos, doing, done] = useRecoilValue(toDoSelector);

    return (
        <div>
            <h1>ToDos</h1>
            <hr />
            <CreateTodo />
            <h2>To Do</h2>
            <ul>
                {toDos.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
            </ul>
            <hr/>
            <h2>Doing</h2>
            <ul>
                {doing.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
            </ul>
            <hr />
            <h2>Done</h2>
            <ul>
                {done.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
