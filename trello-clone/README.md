# Recoil 심화 학습
- 우선 Atom이라는 State관리 객체를 만들어. 이 객체는 `key(유니크해야해)`와 `deafult(값이나, 배열 등등)`를 필수로 갖는데, 이걸 쓸 수 있지.

## Form태그 처리하기

Form태그를 처리하기 위해서는 입력 값들을 저장하는 여러개의 `State`가 필요하고, 그와 동시에 `setState`를 처리하며, `onSubmit함수`도 제공해야 합니다.

한 페이지 안에 `여러개의 Form`이 있으면 여러개의 단순한 동일 동작을 해야할것입니다.

## React Hook Form 라이브러리

-   리액트에서 form 작업을 매우 처리하기 쉽게 해준다. `단연코 최고`라고 한다.

위의 모든 과정을 단 한줄로 끝내준다고 합니다.

```
npm i react-hook-form
const { register, watch, handleSubmit } = useForm<IForm>({
      defaultValues: {
        email: "@naver.com",
      },
    }); // email항목을 default로 @naver.com으로 갖게 함으로써 유저에게 네이버 메일만 사용함을 알려줘

<input
                    {...register("firstName", {
                        required: "write here",
                        validate: {
                          noNico: (value) => value.includes("uiseop") ? "no uiseop allowed" : true,
                          noNick: (value) => value.includes("uiseoo") ? "no uiseoo allowed" : true,
                        } // validate 함수를 여러개 두어서 사용할 수 있음을 보여준다.
                    })}
                    placeholder="First Name"
                />
<input {...register("firstName")}/>
<input {...register("lastName")}/>
<input {...register("password")}/>
```

-   useForm의 register함수와 watch함수를 사용해서 하나 하나 `useState`, `setState`를 설정해주지 않아도 `onChange`, `onBlur` 등의 함수가 내장되어서 훨 씬 쉽고 간결하게 코드를 짤 수 있게 도와줍니다.
-   `handleSubmit`은 onSubmit을 담당합니다. (다있네유 증말루)

```
handleSubmit(onValid함수, inValid함수(필수x))
```

위 코드처럼 작성하면 되고, onValid함수는 입력타입이 `Valid할 경우`에 실행되는 함수입니다.
가령

```
<input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: "Only naver.com emails allowed",
              },
            })}
            placeholder="Email"
          />
<input {...register("password1", { required: "Password is required", minLenght: 10 })}/>
<input {...register("password2", { 
    required: true, 
    minLenght: {
    value: 10,
    message: "Your password is too short! })}/>
```
정규표현식을 사용해서 바로 Validation을 확인할수도 있다고 해!

이처럼 작성되어있으면 `input필드`가 비어있으면 inValid함수가 실행되면서 어디서 오류가 발생했는지 알려줘.(Input태그의 required를 사용하지 않는 이유는, 사용자가 임의로 그 코드를 지우면 HTML이 valid를 보장해주지 못해, 혹은 required를 지원하지 않는 브라우저에서의 문제도 있음)


```
// default Settings
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = (data: IForm) => {
      console.log("add to do", data.toDo)
      setValue("toDo", "") // 제출 후 값을 비워줌
    }
    return (
      <div>
        <form onSubmit={handleSubmit(handleValid)}>
          <input {...register("toDo", {
            required: "Please write a to do",
          })} type="text" placeholder="Write to do" />
          <button>Add</button>
        </form>
      </div>
    );
}

export default ToDoList;
```

# TS 문자열 선택하기
category 항목에는 todo, doing, done이라는 문자열만 허락하고 싶을 경우. `category: string;`으로 하면 안되고 간단하게 `category: "todo"|"doing"|"done";`이라고 작성해주면 된다.

# Recoil의 Selector함수 사용하기
- 하나의 atom으로 여러 세분화된 선택을 할 수 있도록 해줘.
- 가령 atom안에 3개의 `category`가 있다고 가정해보자. 굳이 3개의 atom으로 만들 필요 없이 selector를 사용해 하나의 atom을 사용할 수 있다고 해

```
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
```
여기서 `get`은 options를 인자로 받는데, 이 `options`는 `get`이라는 메서드를 갖고 있어서 `get`으로 `atom`을 가져올 수 있도록 도와줘. 

selector를 사용함으로써 개별적으로 나뉜 atom들을 합칠 수 있는 것. 입맛에 따라