import React from "react";
import { RecoilRoot } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import ToDoList from "./components/ToDoList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  background: ${(props) => props.theme.bgColor};
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

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

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
    const onDragEnd = () => {};
    return (
        <>
            <RecoilRoot>
                <ThemeProvider theme={darkTheme}>
                    <GlobalStyle />
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
                                        </Board>
                                    )}
                                </Droppable>
                            </Boards>
                        </Wrapper>
                    </DragDropContext>
                </ThemeProvider>
            </RecoilRoot>
        </>
    );
}

export default App;
