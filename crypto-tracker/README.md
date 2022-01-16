1. theme에 적용할 스타일을 선언해준다.
2. styled.d.ts에 theme에 선언한 색상 객체의 타입을 styled-componets의 모듈로 선언해서 타입을 선언해준다.
3. react-router-dom과 react-query를 설치해준다.

4. 보여줄 화면들은 `routes폴더`안에다가 모아둡니다. 

5. 라우팅 처리를 해 주기 위해 react-router-dom을 설치합니다.
    - react-router-dom V6에서는 더이상 switch를 사용하지 않고 routes로 더욱 직관적으로 바뀌었습니다.
    - `<Route>` 처리는 비슷한데 더이상 `render/exact/component`를 쓰지 않는다고 합니다.
    - 대신 element로 컴포넌트를 받아옵니다. 
    - 여러 라우팅을 매칭하고 싶은 경우 URL 뒤에 `*`를 사용합니다.