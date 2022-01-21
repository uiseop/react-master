import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateTodo() {
    const setTodos = useSetRecoilState(toDoState)
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = (data: IForm) => {
        setValue("toDo", ""); // 제출 후 값을 비워줌. 이 함수또한 useForm안에 setValue로 제공되어있음
        setTodos((oldToDos) => [
            ...oldToDos,
            { id: Date.now(), text: data.toDo, category: "TO_DO" },
        ]);
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write a to do",
                })}
                type="text"
                placeholder="Write to do"
            />
            <button>Add</button>
        </form>
    );
} 

export default CreateTodo;
