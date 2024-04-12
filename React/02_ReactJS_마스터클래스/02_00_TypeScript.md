# TypeScript

TypeScript에 대한 자세한 기초 내용은 아래에서 확인하기
[👉 타입스크립트로 블록체인 만들기](/TypeScript/01_타입스크립트로_블록체인_만들기/00_목차.md)

## Introduction

타입스크립트는 strongly-typed 언어이다. strongly-typed 란, **프로그래밍 언어가 작동하기 전에 type을 확인한다는 것이다.**

타입스크립트를 작성하면 자바스크립코드로 return 된다.

## Definitely Typed

[🔗 Adding TypeScript(CRA)](https://create-react-app.dev/docs/adding-typescript/)

기존의 리액트 프로젝트에 타입스크립트 추가하기

```npm
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

> [!CAUTION]
> 에러가 났다면 다음과 같이 실행하자.<br>
1. npm install --save typescript @types/node @types/react @types/react-dom @types/jest<br>
2. src 폴더 안에 있던 App.js와 index.js 파일을 App.tsx와 index.tsx 로 바꾼다.<br>
3. "npx tsc --init" 명령어로 tsconfig.json 파일 생성한 후, tsconfig.json 파일에 "jsx": "react-jsx"추가<br>
-------------------------------------------<br>
{<br>
    "compilerOptions": {<br>
        ......<br>
        "jsx": "react-jsx"<br>
    }<br>
}<br>
-------------------------------------------<br>
4. src/index.tsx에서 수정<br>
--------------------------------------------------------------<br>
import ReactDOM from "react-dom/client"<br>
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);<br>
5. npm i --save-dev @types/styled-components

### @types 는 무엇일까?

`@types`는 **아주 큰 Github Repository** 로, **모든 유명한 npm 라이브러리를 가지고 있는 저장소**이다. 여기서 *라이브러리나 패키지의 type definition을 알려준다.*

## Typing the Props

어떻게 component가 필요로 하는 prop을 TypeScript에게 설명할 수 있는지를 알아보자.

### Prop Types
- prop이 해당 위치에 존재하는지 확인해 준다. 
- 브라우저의 콘솔에 경고표시를 해준다.
- 코드를 실행한 '후'에만 확인이 가능하다.
    - 우리가 TypeScript를 사용하는 이유는 코드를 실행하기 전에 오류를 확인하기 위해서이다.
    - 그래서 우리는 Prop Types을 사용하지 않을 것이다.
    - 대신, 우리의 prop들을 TypeScript로 보호해줄 것이다.


> App.tsx

Component에 prop을 보낸다.

```typescript

import Circle from './Circle';

function App() {
  return ( 
    <div> 
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;
```

> Circle.tsx

- Circle : 인터페이스를 통해 object 모양을 잡아주고 App에서 보낸 prop을 받는다.
- Circle : styled-component에 prop을 넘겨준다.
- Container : 인터페이스를 통해 object 모양을 잡아주고 component에서 보낸 prop을 받아서 style에 적용한다.

```typescript
import styled from 'styled-components'

interface ContainerProps {
    bgColor:string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor}; 
    border-radius: 100px;
`;

interface CircleProps {
    bgColor:string;
}

function Circle({bgColor}:CircleProps){ 
    return <Container bgColor={bgColor} />
}

export default Circle; 
```

## Optional Props

> App.tsx

```typescript

import Circle from './Circle';

function App() {
  return ( 
    <div> 
      <Circle borderColor="yellow" bgColor="teal" />
      <Circle text="hi text" bgColor="tomato" />
    </div>
  );
}

export default App;
```

> Circle.tsx

- `?`를 통해 옵션여부를 설정할 수 있다.
- `borderColor={borderColor ?? bgColor}>` 와 같이 `undefined`일 경우 넣어줄 값을 설정해줄 수 있다.
- `text = "default text"`처럼 값을 넣어주지 않을 때 기본값을 설정할 수 있다(이건 타입스크립트가 아닌 ES6 JS)


```typescript
import styled from 'styled-components'

interface ContainerProps {
    bgColor:string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor}; 
    border-radius: 100px;
    border: 2px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor:string;
    borderColor?:string;
    text?:string;
}

function Circle({bgColor, borderColor, text = "default text"}:CircleProps){ 
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    )
}

export default Circle; 
```

## State

- useState()에 값을 넣으면 타입스크립트에서 타입을 추론해서 설정해준다.

```typescript
const [counter, setCounter] = useState(0);
    setCounter("heelo") // error : counter는 number type이기 때문.
```

## Forms

> App.tsx

- `event`로만 작성하면 데이터 타입이 `any`가 된다. any는 최대한 배제해야 함으로 정확한 데이터 타입 작성을 해야한다.

```typescript
import { useState } from 'react';

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value},
    } = event;
    setValue(value); 
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return ( 
    <div> 
      <form onSubmit={onSubmit}>
        <input 
          value={value} 
          onChange={onChange}
          type="text" placeholder="username"/>
        <button>Log In</button>
      </form>
    </div>
  );
}

export default App;
```

## Themes

[🔗 styled-componnets_typescript](https://styled-components.com/docs/api#typescript)

1. styled.d.ts 파일 생성하기
2. 위의 링크에서 아래의 코드 복사해서 붙여넣기
    ```typescript
    // import original module declarations
    import 'styled-components';

    // and extend them!
    declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;

        colors: {
        main: string;
        secondary: string;
        };
    }
    }
    ```
    1. DefaultTheme 아래와 같이 수정하기
    ```typescript
    declare module 'styled-components' {
    export interface DefaultTheme {
        textColor:string;
        bgColor:string;
    }
    ```
3. theme.ts 파일 생성하고 아래와 같이 작성하기
    - 이때 테마는 styled.d.ts 파일 속 속성들하고 동일해야 한다.
    ```typescript
    import { DefaultTheme } from 'styled-components/dist/types';

    export const lightTheme:DefaultTheme = {
        bgColor:"white",
        textColor:"balck",
        btnColor:"tomato",
    }

    export const darkTheme:DefaultTheme = {
        bgColor:"balck",
        textColor:"white",
        btnColor:"teal",
    }
    ```
4. index.tsx에서 ThemeProvider를 import 해주고 아래와 같이 작성하기
    ```typescript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import { ThemeProvider } from 'styled-components';
    import { lightTheme } from './theme';

    const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);

    root.render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
        <App />
        </ThemeProvider>
    </React.StrictMode>
    );
    ```
5. App.tsx에 다음과 같이 작성하기
    ```typescript
    import styled from 'styled-components';

    function App() {
    const Container = styled.div`
        background-color: ${(props) => props.theme.bgColor};
    `;
    const H1 = styled.h1`
        color:${(props) => props.theme.textColor};
    `;
    
    return ( 
        <Container> 
        <H1>protected</H1>
        </Container>
    );
    }

    export default App;
    ```

## Recap
