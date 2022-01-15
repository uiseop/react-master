import styled from "styled-components";
import { useState } from "react";

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${props => props.bgColor};
    border-radius: 50px;
    border: 5px solid ${props => props.borderColor};
`;

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

interface CircleProps {
    bgColor: string;
    borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
    const [counter, setCounter] = useState<number|string>(0);
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}

interface PlayerShape {
    name:string;
    age:number;
}

const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`

sayHello({name:"uiseop", age:26})

export default Circle;
