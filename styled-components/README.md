# styled-components

React에서 사용하는 스타일링에 대해 알아봅니다.

styled-components를 사용해서 스타일링과 관한 기초 실습을 진행합니다.

- 코드의 중복성을 막아준다
- className의 고민을 덜어준다
- 확장이라는 기능을 제공한다
- 컴포넌트에 html 속성을 부여할 수 있다
- 애니메이션을 마치 변수를 사용하듯이 사용할 수 있다
```
const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`
```
- 선택자를 SASS처럼 사용할 수 있다
- 컴포넌트 자체도 변수처럼 선택자로 사용할 수 있다
- css-module처럼 해당 컴포넌트 안에 있는 컴포넌트들만을 스타일링 해 줄 수 있다
- ThemeProvider를 사용해서 간단하게 다크모드/라이트모드 구현이 가능하다