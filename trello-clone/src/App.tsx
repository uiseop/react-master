import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

function App() {
    const [toDos, setTodos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, source }: DropResult) => {
    };
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        <Droppable droppableId="one">
                            {(magic) => (
                                <Board
                                    ref={magic.innerRef}
                                    {...magic.droppableProps}
                                >
                                    {toDos.map((toDo, index) => (
                                        <Draggable
                                            key={index}
                                            draggableId={toDo}
                                            index={index}
                                        >
                                            {(magic) => (
                                                <Card
                                                    ref={magic.innerRef}
                                                    {...magic.dragHandleProps}
                                                    {...magic.draggableProps}
                                                >
                                                    {toDo}
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {magic.placeholder}
                                    {/* magic.placeholder를 사용해서 카드를 빼도 크기 변화 x */}
                                </Board>
                            )}
                        </Droppable>
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
