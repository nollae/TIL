# Crypto Tracker

이번에는 그동안 배운 기술들을 모두 활용하여 연습하고자 한다.

❗️ 여기는 react-router-dom 5.3.0 버전으로 한다(classic version)

## Setup

> React Query
package로, 훨씬 좋고 편리한 방식으로 데이터를 fetch시킬 수 있다.

**먼저 우리 스스로 데이터를 fetch 해봄으로써 왜 리액트 쿼리가 만들어졌고 어떻게 우리를 도울 수 있는지 알아보자.**

일단 세팅부터하자!

> npm install

```npm
npm i react-router-dom@5.3.0 react-query
```

❗️만약 타입스크립트 버전 호환이 안되어서 에러가 나면 아래 명령문 먼저 실행하기

```npm
npm install typescript@4.8.3 
```

```npm
npm i --save-dev @types/react-router-dom
```

> Coin.tsx Coins.tsx 파일 생성하기

> Router.tsx

```typescript
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
```

> App.tsx

```typescript

import Router from './Router';

function App() {
  return ( 
    <Router></Router>
  );
}

export default App;
```

이때 url을 `http://localhost:3000/aaa`라고 할 때 aaa 파라미터를 어떻게 받을 수 있을까?

> Coin.tsx

useParams을 이용해서 url 파라미터 값을 받을 수 있다.

```typescript
import { useParams } from 'react-router-dom';

interface Params {
    coinId: string;
}

function Coin() {
    const {coinId} = useParams<Params>();
    console.log(coinId);
    return <h1>Coin: {coinId}</h1>;
}

export default Coin;
```

## Styles

`styled-components`는 스타일을 가져와 고립시키는 방식이다. 

하지만 때때로 일부 스타일은 Reset CSS라든가 후에 폰트를 설치할 때라든가 document에 적용하기 위한 것들을 포함해야 할 수도 있다.

즉, 전체 document에 적용하고 싶을 수도 있다. 이때 `createGlobalStyle`(by styled-componets)를 사용해주면 된다.

createGlobalStyle 는 렌더링될 때, 해당 컴포넌트는 전역 스코프에 스타일들을 올려준다.

[🔗 Reset CSS](https://github.com/zacanger/styled-reset/blob/master/src/index.ts)

[🔗 Google Fonts](https://fonts.google.com)

[🔗 Flat UI Color](https://flatuicolors.com/palette/gb)

> App.tsx

Reset CSS, Google Font 를 적용해준다.

```typescript

import { createGlobalStyle } from 'styled-components';
import Router from './Router';

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
  }
`;

function App() {
  return ( 
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
```

> styled.d.ts && theme.ts

```typescript
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor:string;
    bgColor:string;
    accentColor:string;
  }
}
```

```typescript
import { DefaultTheme } from 'styled-components/dist/types';

export const theme:DefaultTheme = {
    bgColor: "#2f3640",
    textColor: "#f5f6fa",
    accentColor: "#4cd137",
};
```

> Coins.tsx

```typescript
import styled from 'styled-components';

const Title = styled.h1`
    color:${(props) => props.theme.accentColor}
`;

function Coins() {
    return <Title>Coins</Title>;
}

export default Coins;
```

## Home part One 

> [!Tip]
> 1. <a> 태그를 사용하면 페이지 이동이 되므로 react router dom을 통해 link component를 사용한다.<br>
2. `color: inherit;` 를 사용하면 <a> 태그 클릭한 이후에 해당 태그 색상이 변하지 않는다.
3. <li> 에 `padding: 20px;`을 넣었더니 <a>태그에 가까워 졌을 때만 링크 처리간 된다. 이때, <li> > <a> 에 `padding: 20px;`를 넣으면 <li> 태그 범위까지 선택되도록 할 수 있다.

> Coin.tsx

```typescript
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${(props) => props.theme.accentColor};
`;

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
        },
        ...
    ]

function Coins() {
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            <CoinList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                    </Coin>
                ))}
            </CoinList>
        </Container>
    );
}

export default Coins;
```

## Home part Two

```typescript
useEffect(() => {
    // here 👇
        (async() => {
            fetch("https://api.coinpaprika.com/v1/coins");
        })();
    }, []);
```

위와 같은 방식으로 function을 실행하면 function은 즉시 실행된다.


> Coins.tsx

const coins 의 interface를 생성하고 해당 API를 fetch하고 저장해준다.

```typescript

...

const Loader = styled.span`
    text-align: center;
    display: block;
`; 

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader>
                : 
                <CoinList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                    </Coin>
                ))}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;
```

## Route States

> [!Tip]
> 1. 우리가 원한다면 link를 통해서 다른 화면에 정보를 보낼 수 있다.

> Coins.tsx

<Link>에서 `to`를 이용해서 데이터 값을 넘겨준다.

```typescript

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader>
                : 
                <CoinList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name },
                        }}>
                            <Img 
                                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;
```

> Coin.tsx

`state.name`을 home 화면에서 넘어오면 데이터를 받을 수 있지만, 바로 url을 통해서 들어오면 undefined 이다. `?`를 이용해 해당 부분을 해결해준다.

```typescript
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';


interface RouterParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();


    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : null
            }
        </Container>

    );
}

export default Coin;
```

## Coin Data

coin 화면에 상세 요소를 추가하기 위해 정보 및 가격에 대한 데이터를 API로부터 받아온다.

```typescript

function Coin() {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

            setInfo(infoData);
            setPriceInfo(priceData);

        })();
    }, []);


    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : null
            }
        </Container>

    );
}

export default Coin;
```

## Data Types

infoData 와 priceData를 chrome 에서 Store as Gloabl variable 설정을 해준다.

```javascript
Object.keys(temp1).join()
/**
 * 
 * 'id,name,symbol,rank,is_new,is_active,type,logo,tags,team,description,message,open_source,started_at,development_status,hardware_wallet,proof_type,org_structure,hash_algorithm,links,links_extended,whitepaper,first_data_at,last_data_at'
 * /
```

위와 같이 쉽게 key 값들을 가져올 수 있다.

```javascript
Object.values(temp1).map(v => typeof v).join()
/**
 * 
 * 'string,string,string,number,boolean,boolean,string,string,object,object,string,string,boolean,string,string,boolean,string,string,string,object,object,object,string,string'
 * /
```

value 및 type 도 가져올 수 있다.

> [!TIP]
> Ctrl(Command)+D: 같은 문자열 선택<br>
Shift+Alt(Option)+i: 선택한 모든 문자열에 가장 우측 끝으로 포커싱<br>
Ctrl(Command)+Shift+오른쪽 화살표: 현재 선택한 문자열을 기준으로 우측 끝까지 문자열 선택

> Coin.tsx

fetch 된 데이터의 interface를 생성해준다.

```typescript 

interface RouterParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

    
interface InfoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    tags : ITag[];
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    const [loading, setLoading] = useState(true);
    
    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();

    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);

        })();
    }, []);


    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : null
            }
        </Container>

    );
}

export default Coin;
```

## Nested Routes part One

Nessted router 혹은 Nested route는 route 안에 있는 또 다른 route를 의미한다. 

이는 웹사이트에서 탭을 사용할 때 우리를 많이 도와줄 것이다. 또는 화면 안에 많은 섹션이 나눠진 곳도 마찬가지이다.

> Coin.tsx

Price.tsx 와 Chart.tsx를 만들어 Route 생성을 해준다.

```typescript

function Coin() {
    const [loading, setLoading] = useState(true);
    
    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();

    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]);

     return (
        <Container>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading" : info?.name}
                </Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : 
                (
                    <>
                        <Overview>
                            <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                            <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceInfo?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        <Switch>
                            <Route path={`/${coinId}/price`}>
                                <Price />
                            </Route>
                            <Route path={`/${coinId}/chart`}>
                                <Chart />
                            </Route>
                        </Switch>
                     </>
                )
            }
        </Container>

    );
}

export default Coin;
```

## Nested Routes part Two

`useRouteMatch`는 사용자가 특정한 URL에 있는지의 여부를 알려준다.

> Coin.tsx

```typescript

function Coin() {
    const [loading, setLoading] = useState(true);
    
    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();

    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    ...

     return (
        <Container>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading" : info?.name}
                </Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : 
                (
                    <>
                      ...
                        <Tabs>
                            <Tab $isActive={chartMatch !== null}>
                                <Link to={`/${coinId}/chart`}>Chart</Link>
                            </Tab>
                            <Tab $isActive={priceMatch !== null}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>


                        <Switch>
                            <Route path={`/:coinId/price`}>
                                <Price />
                            </Route>
                            <Route path={`/:coinId/chart`}>
                                <Chart />
                            </Route>
                        </Switch>
                     </>
                )
            }
        </Container>

    );
}

export default Coin;
```

## React Query part One

**React Query는 우리 스스로 실행하고 있었던 로직들을 축약해준다.**

Coins.tsx에서 보면 우리는 State를 가지고 있었는데, 하나는 데이터를 위한 State(coins)였고 다른 하나는 로딩을 위한 State(loading) 였다.

```typescript
const [coins, setCoins] = useState<CoinInterface[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
    (async() => {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        setCoins(json.slice(0, 100));
        setLoading(false);
    })();
}, []);
```

**위의 부분을 react query는 자동을 해줄 것이다.**


> index.tsx

아래와 같이 세팅을 해준다.

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

이제 react query 를 사용하기에 앞서 **`fetcher` 함수를 생성해줘야 한다.** 

> api.tsx

*fetcher 함수는 반드시 fetch promise를 return 해줘야 한다.*

```typescript
export async function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins")
        .then((response) => response.json());
}
```

> Coins.tsx

useQuery라는 hook이 fetcher함수 fetchCoins를 불러오고 그리고 fetcher 함수가 isLoading이라면 react query가 말해준다.

그리고 이 fetcher 함수가 끝난다면 react query가 말해준다. 

fetchCoins가 끝나면 react query는 그 함수의 데이터를 data에 넣어준다.

```typescript

function Coins() {

    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? 
                <Loader>Loading ... </Loader>
                : 
                <CoinList>
                {data?.slice(0,100).map(coin => (
                    ...
                ))}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;
```


페이지를 이동하고 돌아와도 *로딩이 되지 않는 것*을 확인할 수 있는데, 이는 **react query가 데이터를 캐시에 저장해두기 때문이다.**

## React Query part Two

> App.tsx

아래와 같이 세팅을 해주고 웹사이트에 접속하면 `Devtools`를 볼 수 있는데 이건 react query로부터 온 것이다.

**캐시에 있는게 무엇인지 그리고 우리가 무엇을 query했는지 안했는지를 시각화해서 볼 수 있는 가장 쉬운 방법이다.**

```typescript

import { createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyle = createGlobalStyle` ... `;

function App() {
  return ( 
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;

```

> api.tsx

```typescript
export function fetchCoinInfo(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
        .then((response) => response.json());
}

export function fetchCoinTickers(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
        .then((response) => response.json());
}
```

> Coin.tsx

아래와 같이 여러개의 hook을 생성할 수 있다.

```typescript

function Coin() {

    const {coinId} = useParams<RouterParams>();
    const {state} = useLocation<RouteState>();

    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

    const loading = infoLoading || tickersLoading;

     return (
        <Container>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading" : infoData?.name}
                </Title>
            </Header>
            {loading ? 
                <Loader>Loading ... </Loader> 
                : 
                (
                    <>
                        <Overview>
                            <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Open Source:</span>
                            <span>{infoData?.open_source ? "Yes" : "No"}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{infoData?.description}</Description>
                        <Overview>
                            <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                            </OverviewItem>
                        </Overview>

                        <Tabs>
                            <Tab $isActive={chartMatch !== null}>
                                <Link to={`/${coinId}/chart`}>Chart</Link>
                            </Tab>
                            <Tab $isActive={priceMatch !== null}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>


                        <Switch>
                            <Route path={`/:coinId/price`}>
                                <Price />
                            </Route>
                            <Route path={`/:coinId/chart`}>
                                <Chart />
                            </Route>
                        </Switch>
                     </>
                )
            }
        </Container>

    );
}

export default Coin;

```

## Recap

## Price Chart

일단 chart에서 필요한 데이터를 API로부터 fetch한다.

> api.tsx

```typescript
export function fetchCoinHistory(coinId:string){
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60*60*24*7*2;

    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`)
    .then((response) => response.json());
}
```

> Coin.tsx

```typescript
  <Switch>
      <Route path={`/:coinId/price`}>
          <Price />
      </Route>
      <Route path={`/:coinId/chart`}>
          <Chart coinId={coinId} />
      </Route>
  </Switch>
```

> Chart.tsx

```typescript
import { useQueries, useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface CharProps {
    coinId: string;
}

function Chart({coinId}:CharProps){

    const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <h1>CHart</h1>
    );
}

export default Chart;
```

## Price Chart part Two

[🔗 apexcharts](https://apexcharts.com/docs/react-charts/)

```npm
npm install --save react-apexcharts apexcharts
```

## Price Chart part Three

문서를 확인하면서 차트 형식을 구성한다.

> Chart.tsx

```typescript
import { useQueries, useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { parse } from 'path';


interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({coinId}:CharProps){

    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));


    return (
        <div>
            {isLoading ? 
                "Loading chart..." 
                : 
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => parseFloat(price.close)) ?? [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            labels: {
                                show: false,
                                datetimeFormatter: {month: "mmm yy"} 
                            },
                            axisTicks: {
                                show: false
                            },
                            axisBorder: {
                                show: false
                            },
                            type: "datetime",
                            categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#0be881"],
                                stops: [0, 100]
                            }
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`
                            }
                        }
                    }}
                />}
        </div>
    );
}

export default Chart;
```

## Final Touches

정해진 시간마다 다시 fetch하기

> Coin.tsx && App.tsx

```typescript
const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["tickers", coinId], 
    () => fetchCoinTickers(coinId),
    {
        refetchInterval: 5000,
    }
);
```

React Helmet 설정하기

```npm
npm i react-helmet

npm i --save-dev @types/react-helmet

// error 발생하면 아래부분도 실행 
npm i react-helmet-async
```

> App.tsx

```typescript
import { HelmetProvider } from 'react-helmet-async';

... 
function App() {
  return ( 
    <>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}
...
```

> Coin.tsx

```typescript
import {Helmet} from 'react-helmet-async';

...

<Container>
    <Helmet>
        <title>
            {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
    </Helmet>
    ...
</Container>
...
```

## Conclusions

1. coin 페이지로 넘어왔을 때 '뒤로가기' 버튼 만들기
2. price 탭 만들기 
3. chart 탭 candlestick chart 로 변경하기 
4. dark / light mode 만들기
