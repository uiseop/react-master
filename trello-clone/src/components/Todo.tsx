import React from "react";
import { useSetRecoilState } from "recoil";
import { ITodo, toDoState } from "../atoms";

// function Todo({ text, category }: ITodo) {
//     const onClick = (newCategory: ITodo["category"]) => {
//         console.log("i wanna to " + newCategory)
//     };

//     return (
//         <li>
//             <span>{text}</span>
//             {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
//             {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button>}
//             {category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
//         </li>
//     );
// }

// props를 넘겨주지 않고, event의 name으로 확인하는 방법

function Todo({ text, category, id }: ITodo) {
    const setTodos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        console.log(`i wanna go to ${event.currentTarget.name}`)
        setTodos(cur => {
            const targetIdx = cur.findIndex(todo => todo.id === id);
            const newTodo = {text, id, category: event.currentTarget.name as ITodo["category"]}
            return [...cur.slice(0,targetIdx), newTodo, ...cur.slice(targetIdx+1)];
        })
    };

    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
            {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button>}
            {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
        </li>
    );
}

export default Todo;
