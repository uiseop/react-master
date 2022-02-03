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
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return; // 제자리에 다시 둘 경우 그냥 return
        setTodos((cur) => {
            const copyTodos = [...cur];
            // 기존 source의 index의 아이템을 삭제함
            copyTodos.splice(source.index,1)
            // draggableId에는 아이템의 내용이 담겨있음. 때문에 다시 splice를 사용해 원 배열을 수정하도록 함.
            copyTodos.splice(destination?.index, 0 , draggableId)
            return copyTodos
        })
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
                                        // Draggable의 key는 draggableId와 ✅무조건! 같아야 버그가 발생하지 않아. 애초에 key는 index로 두지 마!
                                        <Draggable
                                            key={toDo}
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
