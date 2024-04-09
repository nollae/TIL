# Styled Components

## Why Styled Components

**스타일 적용하는 방법**
1. css 파일을 만들고 js 파일에 import 하기
2. 직접 style 속성 적용하기
3. css 모듈 만들기 
4. ⭐️ styled components

## Our First Styled Component

> create-react-app && styled component
```npm
npx create-react-app 70_react-masterclass --use-npm

npm i styled-components
```

styled-components를 사용하면 모든 style은 컴포넌트를 사용하기 전에 미리 컴포넌트에 포함된다.

> App.js

```javascript
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;
const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
    </Father>
  );
}

export default App;
```

styled components가 임의의 class 명을 만들어주고, 사용자가 작성한 스타일 코드를 어딘가에 담아준다. 이 모든 것이 자동으로 이뤄진다.

## Adapting and Extending

1. **`props`를 활용하면 설정 변경이 가능한 컴포넌트를 생성할 수 있다.**

    > App.js

    ```javascript
    import styled from "styled-components";

    const Father = styled.div`
    display: flex;
    `;

    const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
    `;

    function App() {
    return (
        <Father>
        <Box bgColor="teal" />
        <Box bgColor="tomato" />
        </Father>
    );
    }

    export default App;
    ```

2. **기존의 컴포넌트에 새로운 컴포넌트를 추가하고 싶을 때는 다음과 같다.**

    > App.js

    ```javascript
    ...
    const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
    `;

    const Circle = styled(Box)`
    border-radius: 50px;
    `;
    
    function App() {
    return (
        <Father>
        <Box bgColor="teal" />
        <Circle bgColor="gray" />
        </Father>
    );
    }
    ...
    ```

## 'As' and Attrs

- 컴포넌트의 태그를 바꾸고 싶지만 스타일은 바꾸고 싶지 않을 때 다음과 같이 설정한다.
- styled components가 컴포넌트를 생성할 때, 속성값을 설정할 수 있게 해주는 다음과 같이 설정한다.

> App.js

```javascript
...

// input으로 전달될 모든 속성을 가진 오브젝트를 담을 수 있다.
const Input = styled.input.attrs({required: true, minLength: 10})`
  background-color: tomato;
`; 


function App() {
  return (
    <Father as="header"> // <header class="sc-gLLuof cDGDXm">
      <Input /> // <input required="" minlength="10" class="sc-iBdnpw gmVUdw"></input>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}
...
```

## Animations and Pseudo Selectors

### Animations

> App.js

```javascript
import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const roatationAnimation = keyframes`
  0%{
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform:rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform:rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation:${roatationAnimation} 1s linear infinite
`;


function App() {
  return (
    <Wrapper>
      <Box></Box>
    </Wrapper>
  );
}

export default App;

```

### Pseudo Selectors

> App.js

```javascript

import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  0%{
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform:rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform:rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
  span{
    font-size: 36px;
    &:hover {
      font-size: 48px;
    } // 👉 here : same
    &:active {
      opacity: 0;
    }
  }
  span:hover{

  } // 👉 here : same
`;


function App() {
  return (
    <Wrapper>
      <Box>
        <span>⭐️</span>
      </Box>
    </Wrapper>
  );
}

export default App;
```

## Pseudo Selectors part Two

태그 명에 의존하지 않고 적용하고 싶을 때는 어떻게 해야할까?

> App.js

```javascript

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
    ...
  ${Emoji}:hover {
      font-size: 98px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <!-- 'AS'를 이용해 태그를 변경해도 css가 그대로 적용된다. -->
        <Emoji>⭐️</Emoji>
      </Box>
    </Wrapper>
  );
}
...
```

## Super Recap

## Themes

다크모드를 구현한다고 하면, 50%는 theme의 역할이라고 보면 된다.
나머지 50%는 local Estate Management 이다.

theme 이란, **기본적으로 모든 색상들을 가지고 있는 object이다.**

theme을 사용하려면 어떻게 해야할까?

> index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
}

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke", 
}


root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

> App.js

`ThemeProvider`안에 `App`이 있어서 App에서 Theme의 `props`를 가져와 사용할 수 있다.

```javascript

import styled, {keyframes} from "styled-components";

const TItle = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <TItle>Hello</TItle>
    </Wrapper>
  );
}

export default App;
```