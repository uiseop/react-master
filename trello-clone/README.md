# Recoil 심화 학습

## Form태그 처리하기
Form태그를 처리하기 위해서는 입력 값들을 저장하는 여러개의 `State`가 필요하고, 그와 동시에 `setState`를 처리하며, `onSubmit함수`도 제공해야 합니다.

한 페이지 안에 `여러개의 Form`이 있으면 여러개의 단순한 동일 동작을 해야할것입니다. 

## React Hook Form 라이브러리
- 리액트에서 form 작업을 매우 처리하기 쉽게 해준다. `단연코 최고`라고 한다.

위의 모든 과정을 단 한줄로 끝내준다고 합니다.
```
npm i react-hook-form
const {register, watch} = useForm();

<input {...register("email")}/>
<input {...register("firstName")}/>
<input {...register("lastName")}/>
<input {...register("password")}/>
```
useForm의 register함수와 watch함수를 사용해서 하나 하나 `useState`, `setState`를 설정해주지 않아도 `onChange`, `onBlur` 등의 함수가 내장되어서 훨 씬 쉽고 간결하게 코드를 짤 수 있게 도와줍니다. 