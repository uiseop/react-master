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
    // destination, source, draggableId
    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setTodos((cur) => {
                const copyBoard = [...cur[source.droppableId]];
                copyBoard.splice(source.index, 1);
                copyBoard.splice(destination.index, 0, draggableId);
                return { ...cur, [source.droppableId]: copyBoard }; // 변수를 Object안에 쓸 경우엔 대괄호안에 씀
            });
        } else {
            setTodos((cur) => {
                const destBoard = [...cur[destination?.droppableId]];
                const sourceBoard = [...cur[source.droppableId]];
                sourceBoard.splice(source.index, 1);
                destBoard.splice(destination.index, 0, draggableId);
                return {
                    ...cur,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destBoard,
                };
            });
            console.log(toDos)
        }
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
