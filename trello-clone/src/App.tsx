import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

function App() {
    const [toDos, setTodos] = useRecoilState(toDoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return; // 제자리에 다시 둘 경우 그냥 return
        /* setTodos((cur) => {
            const copyTodos = [...cur];
            // 기존 source의 index의 아이템을 삭제함
            copyTodos.splice(source.index, 1);
            // draggableId에는 아이템의 내용이 담겨있음. 때문에 다시 splice를 사용해 원 배열을 수정하도록 함.
            copyTodos.splice(destination?.index, 0, draggableId);
            return copyTodos;
        }); */
    };
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((boardId) => (
                            <Board
                                boardId={boardId}
                                key={boardId}
                                toDos={toDos[boardId]}
                            />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
