# 첫 셋팅

- CRA를 사용하여 React 환경을 구축했습니다.
- 최근에 Typescript를 다시 공부했는데 이 기회에 TS를 사용해 보았습니다.
- 스타일링은 React에서 가장 많이 쓰이는 CSS-in-JS 방식인 `styled-components`를 사용하였습니다
- 린팅/포매팅 셋업을 위해 요구사항에 명시된 `titicacadev/eslint-config-triple`를 적용해 보았습니다.

# 프로젝트 구조
```bash
.
|-- src # 프로젝트 작성 코드
    |-- App.tsx 
    |-- index.tsx
    |-- assets # 이미지나, 정적 파일들
    |-- components
    |-- hooks # 커스텀 훅
    |-- styles # 리셋 CSS
    |-- types # 타입 관리
    |-- utils # 함수 정의
|-- .eslintrc.js 
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.json
|-- public
|   |-- index.html
```

# 숫자가 올라가는 애니메이션

## JS로? CSS로?

JS로 애니메이션을 구현했을 때와 CSS로 애니메이션을 구현했을 때의 차이점에 대해 찾아보고, 간단한 애니메이션이며 그로 인한 성능상 차이점이 크지 않을거라 생각했기 때문에 처음 사용하는 JS를 사용하여 애니메이션을 구현하려 하였습니다.("./src/uils/FadeIn")

구현 중 처음 구성을 "flex"로 잡아놓고 시작해서 이로 인한 Desc Component와 Awards Component의 마진 병합 현상이 발생했고, 이 곳은 CSS를 활용하여 애니메이션을 구현하기로 했습니다.

## Javascript와 DOM API만을 사용하기

앞의 등장 애니메이션에서 사용하려고 작성했던 코드를 참고하여 작성했습니다. `setTimeout`을 사용하면 사람이 눈으로 보기 편한 60fps가 유지되지 않는다는 문제가 있다고 하여 그 대안으로 등장한 `reqeustAnimationFrame`을 사용해보았습니다. 

## Easing 효과 주기

`reqeustAnimationFrame`에서 증가 속도가 느려지는 효과(`Easing`)을 주기 위해 방법을 찾던 중 <a href="https://www.npmjs.com/package/bezier-easing">`Bezier Easing NPM package`</a>을 찾게 되었습니다.

하지만, 단지 이 효과만을 주기 위해 설치하기 보다는 코드로 구현하는것이 더 할것이라 생각하고 <a href="https://easings.net/en#easeOutCirc">해당 사이트</a>에서 제공해주는 코드를 사용했습니다.
