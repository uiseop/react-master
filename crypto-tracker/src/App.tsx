import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./routes/atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Source+Sans+Pro:wght@300;400&display=swap');
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
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
#root {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url("https://mcs.pt/wp-content/uploads/2021/11/Promo-Facebook-Facebook-event-image21.jpeg") no-repeat;
  background-size: cover;
  position: fixed;
  &::before {
    content: "";
    position: fixed;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.dimmedColor};
  }
}
`;

function App() {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <React.Fragment>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <Router />
                <GlobalStyle />
                <ReactQueryDevtools initialIsOpen={true} />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
