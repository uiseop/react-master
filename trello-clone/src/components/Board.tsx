import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => (
                        // Draggable의 key는 draggableId와 ✅무조건! 같아야 버그가 발생하지 않아. 애초에 key는 index로 두지 마!
                        <DragabbleCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {magic.placeholder}
                    {/* magic.placeholder를 사용해서 카드를 빼도 크기 변화 x */}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;
