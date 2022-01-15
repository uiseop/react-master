import styled from "styled-components";

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${props => props.bgColor};
    border-radius: 50px;
`;

interface ContainerProps {
    bgColor: string;

}

interface CircleProps {
    bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
    return <Container bgColor={bgColor} />;
}

interface PlayerShape {
    name:string;
    age:number;
}

const sayHello = (playerObj:PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`

sayHello({name:"uiseop", age:26})

export default Circle;
