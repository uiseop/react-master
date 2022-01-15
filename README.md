# create-react-app

create-react-app으로 reat 초기 환경을 만들게 되면 여러 파일들이 자동으로 생성되게 됩니다.
하지만 우리는 App.js, index.js만 필요하기때문에 해당 파일을 제외한 모든 파일을 제거해줌으로 초기 환경을 구축합니다.

이 레포지토리 안에는 react 공부를 하면서 학습한 내용들을 정리하는 react 학습지가 될 것 입니다.

# 사전 필요한 요소들 설치 방법

## styled-componets 적용하는 방법
```npm i styled-components```
## TypeScript 적용하는 방법
처음 시작할 때:
```npx create-react-app 앱이름 --template typescript```

or 

중간에 추가할 때(하나씩 다 추가해줘야함):
`npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

react에선 파일명이 `.js`가 아닌 `.tsx`로 사용된다
