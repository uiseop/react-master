import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICard {
    isDragging: boolean;
}

const Card = styled.div<ICard>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.isDragging? "#74b9ff" : props.theme.cardColor};
    box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : ""};
`;
interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic, info) => (
                <Card
                    isDragging={info.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
