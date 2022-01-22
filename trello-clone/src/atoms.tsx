import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface ITodo {
    text: string;
    id: number;
    category: Categories; // 3가지 종류만 쓸 수 있음
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoState = atom<ITodo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const todos = get(toDoState);
        const category = get(categoryState);
        if (category === Categories.TO_DO)
            return todos.filter((todo) => todo.category === Categories.TO_DO);
        if (category === Categories.DOING)
            return todos.filter((todo) => todo.category === Categories.DOING);
        if (category === Categories.DONE)
            return todos.filter((todo) => todo.category === Categories.DONE);
    },
});
