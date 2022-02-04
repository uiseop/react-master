# create-react-app

create-react-app으로 reat 초기 환경을 만들게 되면 여러 파일들이 자동으로 생성되게 됩니다.
하지만 우리는 App.js, index.js만 필요하기때문에 해당 파일을 제외한 모든 파일을 제거해줌으로 초기 환경을 구축합니다.

이 레포지토리 안에는 react 공부를 하면서 학습한 내용들을 정리하는 react 학습지가 될 것 입니다.

# 사전 필요한 요소들 설치 방법

## styled-componets 적용하는 방법

`npm i styled-components`

## TypeScript 적용하는 방법

처음 시작할 때:
`npx create-react-app 앱이름 --template typescript`

or

중간에 추가할 때(하나씩 다 추가해줘야함):
`npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

react에선 파일명이 `.js`가 아닌 `.tsx`로 사용된다

## 파일 관리

`routes` : 사용할 페이지들을 이 폴더에 관리합니다.
`components` : 페이지들에 사용되는 컴포넌트를 이 폴더에 관리합니다.
`styled.d.ts` : theme객체에 적용될 타입을 지정합니다.
`Router.tsx` : `react-router-dom`을 사용해서 라우팅 처리하는 파일입니다.

## 라이트모드/다크모드

단순 한가지 모드만 지원하면 그냥 `index.tsx`에서 `ThemeProvider`랑 `theme`선언해서 전체 애플리케이션에 해당 색상코드를 적용할 수 있지만, 두 가지 모드를 지원하기 위해서는 `theme`을 변경할 수 있어야해. 즉 상태관리가 필요하다는 것.
<img src="./props.png">

`useState`를 사용하기 위해서 옮기는 것 이야. 하지만 `useState` 훅을 사용해서 상태를 관리하면 여러 컴포넌트에서 해당 상태를 사용하기 위해 `모오오오두` 연결되어야 해. 때문에 사용하지도 않는 컴포넌트가 자신의 자식 컴포넌트의 요청으로 인해 필요없는 렌더링이 진행될 수 있어. 또한 useState를 prop으로 전달하려면 `단방향`만 가능하지만 상태관리 라이브러리를 사용하면 `양방향`으로 전달이 가능하다. => `Redux/Recoil 등..`의 사용

`react-query`는 API를 통해 서버의 상태 관리를 하는 건데 theme을 만지는건 굳이 비싼 네트워크통신이 필요 없어보임. 때문에 react-query를 쓰지 않는건가??

## Recoil을 사용하기

```
npm i recoil
```

recoil을 설치한 뒤 전역적으로 사용하기 위해 Provider를 index.tsx에 선언해줘야 선언한 모든 Atom들을 사용할 수 있다고 해.
그리고 Atoms.ts에서 선언한 atom들을 `필요할때마다` 불러와서 사용하면 끝!. `so easy~!!`

```javascript
const isDark = useRecoilValue(설정한 atom이름); // Value만 필요하면 이걸 사용하지
const setterFn = useSetRecoilState(설정한 atom이름); // atom의 value를 변경하는 함수만 필요하면 이걸 써!

==========OR=============
const [x, setX] = useRecoilState(설정한 atom이름); // useState()처럼 사용할 수 있어.(둘 다 사용할 때 이걸 쓰지)
```

`setterFn`은 useState()함수처럼 현재 값을 인자로 받을 수 있어.

```javascript
const hourSelector = selector({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({ set }, newValue) => {
        const minutes = newValue * 60;
        set(minuteState, minutes); // useRecoilState(hourSelector)을 사용해서 minuteState atom을 수정할 수 있다.
    },
});
```

이처럼 정의한 `hour atom`이 변할때마다 변화를 감지해주는 `selector`, 마치 `useEffect`처럼 사용이 가능하지.
또한 `setter`를 사용해서 atom을 굳이 2개 만들지 않고도 하나가 변경되면 나머지도 변경되도록 하는 useEffect나 useMemo같은 기능을 상태관리에서도 사용할 수 있게 됐어!

## react-beautiful-dnd

<img src="https://user-images.githubusercontent.com/2182637/53607406-c8f3a780-3c12-11e9-979c-7f3b5bd1bfbd.gif"/>

이 라이브러리는 그림처럼 요소를 드래그해서 사용할 수 있도록 해 줍니다.
그러기 위해서는 `DragDropContext`로 감싸주고, `Droppable`영역을 만든 후에 `Draggable`요소들을 작성하면 된다고 합니다.

```javascript
/*const onDragEnd = (args: any) => {
    console.log(argss); -> 드래그 한 정보를 출력해줘. args로다가
};*/
const onDragEnd = ({ destination, source }: DropResult) => {};

<DragDropContext onDragEnd={onDragEnd}>
    <div>
        <Droppable droppableId="one">
            // droppableid와 children이 필요한데 children은 함수여야만 한다고
            해.
            {(magic) => (
                <ul ref={magic.innerRef} {...magic.droppableProps}>
                    // 마찬가지로 함수로 작성해야해. 왜?! Magic을 부릴거니까
                    <Draggable draggableId="first" index={0}>
                        {(magic) => (
                            // 여기서 ✅에 magic.dragHandleProps를 제공해서 ✅를 통해서만 드래그가 가능해
                            <li ref={magic.innerRef} {...magic.draggableProps}>
                                <span {...magic.dragHandleProps}>✅</span>
                                One
                            </li>
                        )}
                    </Draggable>
                    <Draggable draggableId="second" index={1}>
                        {(magic) => (
                            <li
                                ref={magic.innerRef}
                                {...magic.draggableProps}
                                {...magic.dragHandleProps}
                            >
                                Two
                            </li>
                        )}
                    </Draggable>
                </ul>
            )}
        </Droppable>
    </div>
</DragDropContext>;
// 그냥 innerRef랑 droppableProps, draggableProps 객체들만 넘겨준게 끝이야. cool!
```

## React의 마법

React는 그 어떤 컴포넌트들의 State가 바뀌기만 하면 하위의 아이템은 다시 렌더링이 된다.(다시 새로고침이 된다고 보면 돼)
때문에 루트 컴포넌트가 변경되면, 자연스럽게 하위의 모든 자식 컴포넌트들 또한 재렌더링이 발생하게 돼. 이건 매우 비효율적이야.
엄청난 기능이지만, 전체를 리렌더링하지 않고, 변경된 부분만 변경시키기 위해서는 어떻게 해야할까?
변경이 안일어난 부분을 React에게 알려줘야해. `그건 key를 사용하는 이유가 아니였나??` ▶️`react memo`를 사용하면 react에게 props이 변경되지 않는한 이 컴포넌트만은 재렌더링 하지 말아달라고 하는 기능이래!

컴포넌트를 export default 할 때, `React.memo(DragabbleCard)`한다. prop이 변하지 않으면 리렌더링을 할 필요 없음 -> 최적화하는 최적의 방법
