import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingOverFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    padding: 20px;
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingOverFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.15s ease-in-out;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingOverFromThis={Boolean(
                            info.draggingFromThisWith
                        )}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            // Draggable의 key는 draggableId와 ✅무조건! 같아야 버그가 발생하지 않아. 애초에 key는 index로 두지 마!
                            <DragabbleCard
                                key={toDo}
                                index={index}
                                toDo={toDo}
                            />
                        ))}
                        {magic.placeholder}
                        {/* magic.placeholder를 사용해서 카드를 빼도 크기 변화 x */}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
