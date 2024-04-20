
import { createGlobalStyle, ThemeProvider, styled} from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { theme, darkMode, lightMode } from './theme';
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
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
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration:none;
    color: inherit;
  }
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color:${(props) => props.theme.accentColor};
    margin-left: auto;
    font-weight: bold;
`;

const ThemeWrapper = styled.div`
    cursor: pointer;
    width: 32px;
    margin-right: auto;
    padding-left: 25px;
    margin-bottom: -1px;
`;

const StyledBsFillMoonFill = styled(BsFillMoonFill)`
  width: 30px;
  height: 30px;
`;

const StyledBsFillSunFill = styled(BsFillSunFill)`
  width: 30px;
  height: 30px;
`;

function App() {

  const [mode, setMode] = useState(true);
  const handleThemeMode = () => {
    setMode((props) => !(props));
  }

  return ( 
    <ThemeProvider theme={mode ? darkMode : lightMode}>
      <GlobalStyle />
      <HelmetProvider>
          <Header>
              <Title>Top 100 Cyptos</Title>
              <ThemeWrapper onClick={() => handleThemeMode()}>
                {mode ? <StyledBsFillSunFill color = "white"/> : <StyledBsFillMoonFill color = "black"/>}
            </ThemeWrapper>
          </Header>
        
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
