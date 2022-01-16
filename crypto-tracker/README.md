1. theme에 적용할 스타일을 선언해준다.
2. styled.d.ts에 theme에 선언한 색상 객체의 타입을 styled-componets의 모듈로 선언해서 타입을 선언해준다.
3. react-router-dom과 react-query를 설치해준다.

4. 보여줄 화면들은 `routes폴더`안에다가 모아둡니다. 

# react-router-dom V6
5. 라우팅 처리를 해 주기 위해 react-router-dom을 설치합니다.
    - react-router-dom V6에서는 더이상 switch를 사용하지 않고 routes로 더욱 직관적으로 바뀌었습니다.
    - `<Route>` 처리는 비슷한데 더이상 `render/exact/component`를 쓰지 않는다고 합니다.
    - 대신 element로 컴포넌트를 받아옵니다. 
    - 여러 라우팅을 매칭하고 싶은 경우 URL 뒤에 `*`를 사용합니다.

6. react-router-dom을 사용해서 라우팅 처리를 하기 위해서는 우선 `router context`를 제공해야합니다.
`router context`는 `<BrowserRouter>`라는 컴포넌트로 모든 `<App>`을 감쌈으로써 제공할 수 있다고 합니다.

# styled-components 전역 스타일링 -> for Reset CSS
전역으로 모든 styled-components들의 컴포넌트들에 Reset CSS를 적용하려면 어떻게 해야 할까?
우선 Reset CSS라는 라이브러리를 다운받는 방법이 있다. 하지만 굳이 Reset CSS를 적용하기 위해 라이브러리를 설치하는 것은 낭비라고 생각한다. 때문에 styled-components에서 제공하는 createGlobalStyle이라는 기능을 사용해서 적용해보도록 하자

## createGlobalStyle이란?
이건 하나의 컴포넌트를 만들 수 있게 해주는데, 렌더링 될 때, 이 컴포넌트는 전역 스코프에 스타일들을 올려주게 된다고 해. 따라서 Reset CSS같은 전역으로 적용될것은 이걸로 해결할 수 있겠습니다.

이 컴포넌트로 어떤 컴포넌트를 감쌀 필요가 없고 `그냥 선언만 해주면 되는것`