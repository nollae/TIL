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