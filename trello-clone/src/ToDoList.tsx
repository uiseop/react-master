import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
    const { register, watch } = useForm();
    console.log(watch())

    return (
        <div>
            <form>
                <input {...register("todo")} type="text" placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
