# State Management

**Recoil은 React JS에서 사용할 수 있는 state management library이다.**

## Dark Mode part One

❗️ state를 사용하기 위해 index.tsx에 있는 `ThemeProvider`를 App.tsx로 옮겨준다.

## Dark Mode part Two

> App.tsx

```typescript
function App() {

  const [mode, setMode] = useState(true);
  const handleThemeMode = () => {
    setMode((current) => !(current));
  }

  return ( 
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router handleThemeMode={handleThemeMode} mode={mode} />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}
```

> Route.tsx

```typescript

interface IRouteProps {
    handleThemeMode: () => void;
    mode: boolean;
}

function Router({handleThemeMode, mode}:IRouteProps){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin mode={mode}/>
                </Route>
                <Route path="/">
                    <Coins handleThemeMode={handleThemeMode} mode={mode}/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
```

> Coins.tsx

```typescript

interface ICoinsProps {
    handleThemeMode: () => void;
    mode:boolean;
}

function Coins({ handleThemeMode, mode }:ICoinsProps) {

    return (
        <Container>
            <Header>
                <Title>Top 100 Cyptos</Title>
                <ThemeWrapper onClick={() => handleThemeMode()}>
                {mode ? <StyledBsFillSunFill color = "white"/> : <StyledBsFillMoonFill color = "black"/>}
                </ThemeWrapper>
            </Header>
             
            ...
             
        </Container>
    );
}

export default Coins;
```

**[ mode 순서 ]**

```
App(mode, modifierFn) 
    -> Router -> Coins(modifierFn, mode)
    -> Router -> Coin -> Chart(mode)
```

위와 같이 사용하는 것이 바로 `global state` 이다.

**global state는 애플리케이션 전체에 공유되는 state이다.**

> mode : App -> Router -> Coin -> Chart
부모가 자식에게 prop을 내려주는 계층 구조 보다 아래의 방식을 추천한다.

> Header -> (mode) <- Chart
state를 어떤 비눗방울 안에 넣고 Header, Chart가 접근할 수 있도록 하는 것이다.

## Introduction to Recoil

Recoil은 비눗방울(Atom)과 같은(위의 글 참고) 작업을 할 수 있다.

Atom을 생성한 후, 어떤 component에서 atom의 정보를 원한다면 prop을 통해 전달받는 것이 아닌, **component를 직접 atom에 연결하면 된다.**

atom은 **특정 component에 종속되지 않는다.**

```npm
npm install recoil
```

> App.tsx

설치 후, 아래와 같이 세팅해준다.

```typescript
import { RecoilRoot } from 'recoil';

...

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
```

> atoms.ts

atom file을 생성해준다.

```typescript
import { atom } from 'recoil';


export const modeAtom = atom({
    key: "mode",
    default: true,
})
```

> App.tsx

atom을 이용해 mode값을 가져오면 잘 적용되는 것을 확인할 수 있다.

```typescript

import { useRecoilValue } from 'recoil';
import { modeAtom } from './atoms';

function App() {
  const mode = useRecoilValue(modeAtom);
  
  return ( 
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
```

## Introduction to Recoil part Two

atom을 제어하는 방법은 다음과 같다.

> Coins.tsx

```typescript
...

function Coins({ }:ICoinsProps) {

    ...
    const mode = useRecoilValue(modeAtom);
    const setModeAtom = useSetRecoilState(modeAtom);
    const handleModeAtom = () => setModeAtom((current) => !current);

    return (
        <Container>
            <Header>
                <Title>Top 100 Cyptos</Title>
                <ThemeWrapper onClick={handleModeAtom}>
                {mode ? <StyledBsFillSunFill color = "white"/> : <StyledBsFillMoonFill color = "black"/>}
                </ThemeWrapper>
            </Header>
            ...
        </Container>
    );
```

## Recap

## To Do Setup

여기에서 recoil에 대해서 더 자세히 배워보도록 할 것이다.
<br>
*(참고, todolist project 생성)*

> index.tsx

ThemeProvider을 여기에 생성해준다.

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);


root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
```

> App.tsx

```typescript

import { createGlobalStyle} from 'styled-components';
import ToDoList from './ToDoList';

...

function App() {

  return ( 
      <>
        <GlobalStyle />
        <ToDoList />
      </>
  );
}

export default App;

```

> ToDoList.tsx

```typescript
import { useState } from 'react';

function ToDoList(){

    const [toDo, setToDo] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: {value},
        } = event;
        setToDo(value);
    };
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
```

## Forms

[🔗 react-hook-form](https://react-hook-form.com/)

`react-hook-form`은 리액트에서 form으로 작업하기에 가장 좋은 방법이다.

react-hook-form은 ToDoList.tsx에서 작업했던 코드를 **간단하게 끝낼 수 있게 만든다.**<br>
react-hook-form을 사용하지 않으면 **form에 많은 state들을 등록해야 한다.** 또한, form validation이 필요할 것인데 이때도 많은 state들을 등록해야 한다. **즉, 이 모든 것들을 내가 제어해야 한다는 것이다.**

이제 react-hook-form 을 사용해보자.

```npm
npm install react-hook-form
```

### useForm()

`useForm`은 아주 많은 것들을 그냥 제공해준다. 


#### register

그 중에 `register`라는 함수가 있는데, 이 함수가 ToDoList.tsx에서의 **onChange 이벤트 헨들러, props(onChange, value...), useState... 와 같은 것들을 대신 해줄 것이다.**

```code
console.log(register("ToDo"));

// result

name : "ToDo"
onBlur : async event => {…}
onChange : async event => {…}
ref : ref => {…}
```

#### watch

`watch`는 **내가 form의 입력값들의 변화를 관찰할 수 있게 해주는 함수이다.**

```code
console.log(watch());

// result

{ToDo: 'dfdfsdf'}
```

> ToDoList.tsx

useForm을 적용해보자. 아주 간단하게 작성된 것을 확인할 수 있다.

```typescript
import { useState } from 'react';

import { useForm } from 'react-hook-form';

function ToDoList(){

    const { register, watch } = useForm();

    return (
        <div>
            <form>
                <input {...register("Email")} placeholder="Email" />
                <input {...register("firstName")} placeholder="First Name" />
                <input {...register("lastName")} placeholder="Last Name" />
                <input {...register("userName")} placeholder="UserName" />
                <input {...register("password")} placeholder="Password" />
                <input {...register("password1")} placeholder="Password1" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
```

## Form Validation

### useForm()

#### handleSubmit

`handleSubmit`이 바로 **validation을 담당하게 될 것이다.** 또한, **이벤트를 preventDefault 하는 것을 담담한다.**

#### {required : true, minLength: 5}

**이렇게 사용하면 HTML에 의지하는게 아니라,** 자바스크립트를 사용해서 validation을 실행하고 있으므로, **간편하게 활용할 수 있다.**

#### formState   

**validation을 확인한 후, 에러가 난 부분을 출력해준다. 뿐만 아니라, 에러 타입과 메시지까지 출력해준다.**

```code
console.log(formState.errors);

// result

email: 
  message: "Password1 is required"
  ref: input
  type: "required"

  ...
```

위의 내용을 반영한 부분은 다음과 같다.

> ToDoList.tsx

```typescript
import { useState } from 'react';

import { useForm } from 'react-hook-form';

function ToDoList(){

    const { register, watch, handleSubmit, formState } = useForm();
    // 이 함수는 react-hook-form이 모든 validation을 다 마쳤을 때만 호출될 것이다.
    const onValid = (data:any) => {
        console.log(data);
    }
    console.log(formState.errors);
    
    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} 
                  onSubmit={handleSubmit(onValid)}
                  >
                <input {...register("email", {required : true})} placeholder="Email" />
                ...
                <input {...register("userName", {required : true, minLength: 10})} placeholder="UserName" />
                <input {...register("password", {required : true, minLength: 5})} placeholder="Password" />
                <input {...register("password1", {
                  required : "Password1 is required", 
                  minLength: {
                    value: 5,
                    message: "Your password1 is too short"
                  }})} placeholder="Password1" 
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
```

## Form Errors

### 정규식 표현

^ 문장의 시작
<br>
+ 하나 또는 하나이상

```code
/^[A-Za-z0-9._%+-]+@naver.com$/
/^[A-Za-z0-9._%+-]+@naver.com/g
```

[🔗 정규식 참고 사이트](https://www.regexpal.com)


> ToDoList.tsx

- defaultValues : input에 기본값 설정
- pattern : 정규식 표현

```typescript

interface IForm {
    email : string;
    firstName : string;
    lastName : string;
    userName : string;
    password : string;
    password1 : string;
}

function ToDoList(){

    const { 
        register, 
        watch, 
        handleSubmit, 
        formState:{errors} 
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        }
    });

    const onValid = (data:any) => {
        console.log(data);
    }

    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} 
                  onSubmit={handleSubmit(onValid)}
                  >
                <input 
                    {...register("email", {
                        required : "Email is required",
                        pattern : {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed"
                        }
                    })} 
                    placeholder="Email" 
                />
                <span>
                    { errors?.email?.message }
                </span>
                ...
                
                <input {...register("password", {required : "write here", minLength: 5})} placeholder="Password" />
                <span>
                    { errors?.password?.message }
                </span> 
                <input {...register("password1", { required : "Password1 is required", 
                  minLength: {
                      value: 5,
                      message: "Your password1 is too short"
                  }
                  })} placeholder="Password1" />
                <span>
                    { errors?.password1?.message }
                </span> 
                <button>Add</button>
            </form>
        </div>
    );
}

```

## Custom Validation

> ToDoList.tsx

- setError : error 제어
  - shouldFocus : error난 부분에 focus
- validate : value값 제어 

```typescript

function ToDoList(){

    const onValid = (data: IForm) => {
        if(data.password !== data.password1){
            setError(
                "password1", 
                {message: "Password are not the same"}, 
                {shouldFocus: true}
            );
        }
        // setError("extraError", {message: "Server offline."});
    }

    return (
    <div>
            <input {...register("firstName", 
              {
                  required : "write here", 
                  validate : {
                      noHi: (value) => 
                          value.includes("hi") ? "no hi allowed" : true,
                      noEnd: (value) => 
                          value.includes("end") ? "no end allowed" : true,
                  }
              })} 
              placeholder="First Name" 
      />
        </div>
    );
}
```

## Recap

**❗️ handleSumbit을 사용할 때, 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는 것이다.**

> ToDoList.tsx

```typescript
import { useForm } from 'react-hook-form';

interface IForm {
    toDo: string;
}

function ToDoList(){
    const {
        register, handleSubmit, setValue
    } = useForm<IForm>();

    const handleValid = (data:IForm) => {
        console.log("add to do", data.toDo);
        setValue("toDo", "");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",
                        {
                            required: "Please Write a To Do",
                        })} 
                        placeholder="Write a to do" 
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
```

## Add To Do

> ToDoList.tsx

```typescript
import { useForm } from 'react-hook-form';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
    id: number;
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
});

function ToDoList(){
    // atom에서 값을 불러온다.
    // const value = useRecoilValue(toDoState);
    // atom의 값을 수정한다.
    // const modFn = useSetRecoilState(toDoState);
    
    // value와 변경함수를 모두 얻고 싶을 때 사용한다.
    const [toDos, setToDos] = useRecoilState(toDoState);
    
    const {
        register, handleSubmit, setValue
    } = useForm<IForm>();

    const handleValid = ({toDo}:IForm) => {
        console.log("add to do", toDo);
        // ...oldToDos : 배열 안의 요소를 반환한다.
        setToDos(oldToDos => [{text:toDo, id:Date.now(), category: "TO_DO"}, ...oldToDos])
        setValue("toDo", "");
    };

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",
                        {
                            required: "Please Write a To Do",
                        })} 
                        placeholder="Write a to do" 
                />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo => 
                    (
                        <li key={toDo.id}>{toDo.text}</li>
                    )
                )}
            </ul>
        </div>
    );
}

export default ToDoList;
```

## Refactoring

Todo list / Todo 입력 폼 / Todo atom 파일을 각각 분리한다.

1. toDo atom에는 atom을 위한 타입과 atom에대한 정의만 입력한다.
2. todo 입력폼에는 폼의 submit 을 통한 결과를 처리하는 역할만한다.
3. todo는 각각의 todo에대한 정의를 넣는다.
4. todoList는3 번의 todo를 그려주는 역할을한다.

여기서 파일별 책임이 어떻게 분리되는지 주의해서 봐야한다.

1. atom 선언파일
2. todoForm 컨트롤 컴포넌트
3. 각각의 todo에대한 컴포넌트
4. 단지 그려주는 todolist 컴포넌트

> atom.tsx

```typescript
import { atom } from 'recoil';

export interface IToDo {
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
    id: number;
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});
```

> CreateToDo.tsx

```typescript
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
    toDo: string;
}

function CreateToDo() {

    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({toDo}:IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category: "TO_DO" },
            ...oldToDos,
          ]);
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo",
                    {
                        required: "Please Write a To Do",
                    })} 
                    placeholder="Write a to do" 
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
```

> ToDo.tsx

```typescript
import { IToDo } from '../atoms';

function ToDo({text }:IToDo) {
    return (
        <li>
            <span>
                {text}
            </span>
            <button>To Do</button>
            <button>Doing</button>
            <button>Done</button>
        </li>
    );
}

export default ToDo;
```

> ToDoList.tsx

```typescript
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CreateToDo from './CreateToDo';
import { toDoState } from '../atoms';
import ToDo from './ToDo';

function ToDoList(){
    const toDos = useRecoilValue(toDoState);
    
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((toDo) => 
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
        </div>
    );
}

export default ToDoList;
```

## Categories

> ToDo.tsx

방법 1 & 방법 2

```typescript
import { useRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({text , category, id}:IToDo) {

    const setToDos = useRecoilState(toDoState);

    // <방법1>
    // const onClick = (newCategory:IToDo["category"]) => {
    //     console.log("i wanna to ", newCategory);
    // };
    // <방법2>
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        console.log("i wanna to ", event.currentTarget.name);
        const {
            currentTarget:{name},
        } = event;
        console.log(name);
    };


    return (
        <li>
            <span>
                {text}
            </span>
            {/* <방법1>
            {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
            {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button>}
            {category !== "DONE" &&  <button onClick={() => onClick("DONE")}>Done</button>} */}
            
            {/* <방법2> */}
            {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
            {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button>}
            {category !== "DONE" &&  <button name="DONE" onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;
```

## Immutability part One

1) find to do based on id [2]
2) update to do
3) update to dos

> ToDo.tsx

1,2번은 아래에 구현되어 있다. 3번은 다음챕터에서.

```typescript
...
function ToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget:{name},
        } = event;
        setToDos((oldToDos) => {
            // 1번 
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            // 2번
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category:name};

            console.log("replace the to do in the index", targetIndex, "with", newToDo);
            return oldToDos;
        })
    };
    ...
}
```

## Immutability part Two 

3번을 구현할 때, 특정 index를 삭제하고 배열 뒤에 넣는 것이 아닌 `교체`를 하고 싶은 것이다.

```code
// ex
const food = ["pizza", "mango", "kimchi", "kimbab"]
const front = ["pizza"]
const back = ["kimchi", "kimbab"]
const finalPart = [...front, "감", ...back]

// code
const target = 1
[...food.slice(0, 1), "감", ...food.slice(target+1)]
```

1) mango의 위치를 구한다.
2) 배열을 나눈다. (mango 이전의 모든 원소를 담은 배열, 이후의 모든 원소를 담은 배열)
3. 새로운 배열을 생성한다.

> ToDo.tsx

위의 방법을 구현하면 아래와 같다.

```typescript
function ToDo({text , category, id}:IToDo) {
    ...
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget:{name},
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category:name as any };

            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
        })
    };
    ...
}
```

## Selectors part One

**recoil의 `selector`는 `derived state`를 나타낸다.**

`derived state`는 state를 입력 받아서 이를 변형해 반환하는 순수함수를 거쳐 반환된 값을 말한다.

> atoms.tsx

- selector는 **atom의 output을 변형시켜주는 도구이다.**
- get function은 **selector의 내부로 atom을 가지고 올 수 있다.**

*(js 참고) filter function은 배열에서 조건에 맞지 않는 원소들을 제거한 배열을 return한다.*

```typescript
import { atom, selector } from 'recoil';

...

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        return [
                toDos.filter((toDo) => toDo.category === "TO_DO"),
                toDos.filter((toDo) => toDo.category === "DOING"),
                toDos.filter((toDo) => toDo.category === "DONE"),
            ];
    }
})
```

> ToDoList.tsx

```typescript

function ToDoList(){
    const toDos = useRecoilValue(toDoState);
    const [toDo, doing, done] = useRecoilValue(toDoSelector);
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <h2>To Do</h2>
            <ul>
                {toDo.map((toDo) => 
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
            <hr />
            <h2>Doing</h2>
            <ul>
                {doing.map((toDo) => 
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
            <hr />
            <h2>Done</h2>
            <ul>
                {done.map((toDo) => 
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
        </div>
    );
}

export default ToDoList;
```

## Selectors part Two

위의 방식보다 지금 이 방식이 좀 더 간편하다.

> atoms.tsx

```typescript
...

export const categoryState = atom({
    key: "category",
    default: "TO_DO"
});

...
 
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        if(category === "TO_DO") 
            return toDos.filter((toDo) => toDo.category === "TO_DO");
        if(category === "DOING") 
            return toDos.filter((toDo) => toDo.category === "DOING");
        if(category === "DONE") 
            return toDos.filter((toDo) => toDo.category === "DONE");

    }
})

```

> ToDoList.tsx

```typescript

function ToDoList(){
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value);
    };

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value="TO_DO" >To Do</option>
                <option value="DOING" >Doing</option>
                <option value="DONE" >Done</option>
            </select>
            <CreateToDo />
            {toDos?.map(toDo => <ToDo  key={toDo.id} {...toDo} />)}
        </div>
    );
}

export default ToDoList;
```

## Enums

enum은 enumerable 이라는 뜻이다.

enum은 프로그래머를 도와주기 위해서 일련의 숫자를 문자로 표현해준다.

> atoms.tsx

```typescript
import { atom, selector } from 'recoil';

export enum Categories {
    // = 안해주면, 숫자로 인식
    "TO_DO" = "TO_DO", 
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    category: Categories;
    id: number;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        if(category === Categories.TO_DO) 
            return toDos.filter((toDo) => toDo.category === Categories.TO_DO);
        if(category === Categories.DOING) 
            return toDos.filter((toDo) => toDo.category === Categories.DOING);
        if(category === Categories.DONE) 
            return toDos.filter((toDo) => toDo.category === Categories.DONE);

    }
})
```

> ToDoList.tsx

```typescript
import { categoryState, toDoSelector, toDoState, Categories } from '../atoms';
...
function ToDoList(){
    ...

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO} >To Do</option>
                <option value={Categories.DOING} >Doing</option>
                <option value={Categories.DONE} >Done</option>
            </select>
            <CreateToDo />
            {toDos?.map(toDo => <ToDo  key={toDo.id} {...toDo} />)}
        </div>
    );
}

export default ToDoList;
```

> ToDo.tsx

```typescript
import { IToDo, toDoState, Categories } from '../atoms';
...
function ToDo({text , category, id}:IToDo) {

    ...

    return (
        <li>
            <span>
                {text}
            </span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE &&  <button name={Categories.DONE} onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;
```

## Recap

1. toDo를 삭제할 수 있는 버튼만들기
2. toDo를 localStorage에 저장해뒀다가, 애플리케이션이 실행될 때 localStorage에서 toDo를 가져오기(즉, localStorage에 저장하고, 또 로드하는 기능 만들기)