# styled-components Error
styled-components는 typescript로 작성되어있지 않기때문에 에러를 내뿜습니다.
때문에 `npm i --save-dev @types/styled-components`를 설치하라는 에러가 나타나고, 이를 설치해주면 됩니다.
그러면 더이상 에러가 나타나지 않습니다.

`@types`는 거대한 npm라이브러리야. 다른 사람들이 많이 사용되는 라이브러리들을 우리같은 뉴비들을 위해 ts로 트랜스컴파일 해 줬다고 해. 따라서 필요한건 저기서 대부분 찾을 수 있다고 하는군!

# props에 type을 지정해주기

props에 type을 지정해주기 위해서는 전달받는 props의 type을 지정해줄 필요가 있습니다.

ts에서 객체의 타입을 지정하는 방식은 `interface`를 사용하면 된다고 합니다.

`Circle.tsx`에서 확인하실 수 있듯이 Circle컴포넌트가 받는 prop의 타입은 `CircleProps`라는 인터페이스를 만들어서 객체에 대한 타입을 지정해줍니다.

# styled-componets의 props에 type

styled-components도 마찬가지로 prop을 전달받을 수 있는데 이는 선언할 때 `<인터페이스 이름>`을 전달해주면 된다고 합니다.

```
styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    bacakground-color: ${props => props.bgColor}
`
```

# interface
인터페이스는 `객체`가 어떻게 생겼는지 설명해주는거야.
다른 원시 객체들은 그냥 바로 선언해주면 돼.

ts는 코드가 실행되기 전에 확인해줘서 자잘한 오류를 방지해줘.
Prop types는 코드 실행 "후" 브라우저에 에러가 나타나지.
우리가 잘못된 타입의 prop을 보내거나, `필수의` prop을 보내지 않는다면 실행 전에 오류가 발생함을 알려줘.