import { atom } from "recoil";

export interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE"; // 3가지 종류만 쓸 수 있음
}

export const toDoState = atom<ITodo[]>({
    key: "toDo",
    default: [],
});