import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet";

const blinkCursor = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const typing = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 857.083px;
    }
`;

const H1 = styled.h1`
    position: relative;
    text-transform: uppercase;
    color: #fff;
    font-size: 100px;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    animation: ${typing} 3s steps(14);
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        height: 100%;
        background: #fff;
        animation: ${blinkCursor} 1s linear infinite;
    }
`;

function Home() {
    return (
        <>
            <Helmet>
                <title>Crypto Tracker</title>
            </Helmet>
            <H1>crypto tracker</H1>
        </>
    );
}

export default Home;
