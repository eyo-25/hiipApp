import { createGlobalStyle } from "styled-components";
import { Dark_Gray } from "./Colors";

const GlobalStyle = createGlobalStyle`
:root {
  --vh: 100%;
}
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
time, mark, audio, video, button {
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
  font-family: "NotoSansKR";
  line-height: 1;

  position: relative;
  margin: 0 auto;
  max-width: 414px;
  
  // 스크롤바 영역차지 막기
  /* overflow: overlay; */
  // 스크롤 막기
  overflow: hidden;
  touch-action: none;
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
*{
  box-sizing: border-box;
}
a {
  text-decoration: none;
}

body::-webkit-scrollbar {
  width: 5px;  /* 스크롤바의 너비 */
}

body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(255, 255, 255, 0.3); /* 스크롤바의 색상 */
}

body::-webkit-scrollbar-track {
    background: #0c0c0c  /*스크롤바 뒷 배경 색상*/
}
`;

export default GlobalStyle;
