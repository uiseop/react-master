import { atom, selector } from "recoil";

export interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE"; // 3가지 종류만 쓸 수 있음
}

export const categoryState = atom({
    key: "category",
    default: "TO_DO",
});

export const toDoState = atom<ITodo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const todos = get(toDoState);
        return [
            todos.filter((todo) => todo.category === "TO_DO"),
            todos.filter((todo) => todo.category === "DOING"),
            todos.filter((todo) => todo.category === "DONE"),
        ];
    },
});
