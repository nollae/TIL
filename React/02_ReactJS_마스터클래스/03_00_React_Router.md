# React Router V6

## Introduction

[🔗 react-router-dom](https://www.npmjs.com/package/react-router-dom?activeTab=versions)

> classic version
```npm
npm i react-router-dom@5.3.4
```

❗️만약 타입스크립트 버전 호환이 안되어서 에러가 나면 아래 명령문 먼저 실행하기

```npm
npm install typescript@4.8.3 
```

## BrowserRouter

> react-router-dom 6.4 install

```npm
npm i react-router-dom@6.4
```

> Header.tsx

```typescript
import { Link } from 'react-router-dom';

function Header(){
    return (
        <header>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
            </ul>
        </header>
    );
}

export default Header;
```

이때, **Header는 Link를 사용하고 있으므로 Router 안에 넣어야 한다.** 왜냐하면 Router 밖에서는 Link를 render할 수 없기 때문이다.

> Router.tsx

```typescript
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function Router(){
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
}

export default Router;
```

이제 routes를 생성할 차례이다.

```typescript
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import About from './screens/About';

function Router(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
```

이제 Router 파일을 불러오면 된다.

> App.tsx

```typescript
import React from 'react';
import Router from './Router';

function App() {
  return (
    <div>
        <Router />
    </div>
  );
}

export default App;
```

## createBrowserRouter

`createBrowserRouter`를 선호하는데, 왜냐하면 **브라우저를 좀 더 선언적으로 바꿔주기 때문이다.**

> Router.tsx

```typescript
import { createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Root from './Root';

const router = createBrowserRouter([
    {
        path: "/", // parent
        element: <Root />,
        children: [
            {
                path:"",
                element: <Home />
            },
            {
                path:"about",
                element: <About />
            },
        ]
    },

])
export default router;
```

> index.tsx

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

> Root.tsx (이전의 App.tsx)

```typescript
import React from 'react';
// import Router from './Router';

function Root() {
  return (
    <div>
      Hello 
    </div>
  );
}

export default Root;
```

위와 같이 작성하고 `/about`으로 접근하더라도 여전히 `/`와 매치가 된다. 즉, 여전히 Root를 render하고 있다는 것이다.

**그래서 `react-router-dom` 에게 "우리가 Root의 자식을 render하길 원한다"고 알려야 한다.**

방법은 다음과 같다.

> Root.tsx

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <Outlet /> 
    </div>
  );
}

export default Root;
```

이렇게 하면, `/about` 페이지로 가면 react router가 이 `Root`를 보고 Root를 render하고 react router는 `Outlet`을 `About`으로 대체하려 한다.

## errorElement

errorElement은 **우리의 컴포넌트에 에러가 발생해서 충돌하거나 컴포넌트 위치를 차지 못할 때 사용한다.**

> Router.tsx

```typescript
import { createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Root from './Root';
import NotFound from './screens/NotFound';
import ErrorComponent from './components/ErrorComponent';

const router = createBrowserRouter([
    {
        path: "/", // parent
        element: <Root />,
        children: [
            {
                path:"",
                element: <Home />,
                errorElement: <ErrorComponent />
            },
            {
                path:"about",
                element: <About />
            },
        ],
        errorElement: <NotFound />, 
    },

])
export default router;
```

## useNavigate

useNavigate는 이전에 우리가 사용해봤던 hook이다. **useNavigate는 유저를 어딘가로 보내는 기능이 있다. 즉, 유저를 이동시키고 위치를 바꿔준다.**

방법은 2가지가 있다.

1. Link를 이용한다.
2. useNavigate를 사용한다.

> Header.tsx

```typescript
import { Link, useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate()
    const onAboutClick = () => {
        navigate("/about")
    }

    return (
        <header>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <button onClick={onAboutClick}>About</button>
                </li>
            </ul>
        </header>
    );
}

export default Header;
```

## useParams

예시를 위해 간단한 데이터베이스를 만들자

> db.ts

```typescript
export const users = [
    {
      id: 1,
      name: "nico",
    },
    {
      id: 2,
      name: "lynn",
    },
  ];
```

> Home.tsx

```typescript
import { users } from '../db';
import { Link } from 'react-router-dom';

function Home(){
    
    return (
        <div> 
            <h1>Users</h1>
            <ul>
                {users.map((user) => ( 
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
```

> Router.tsx

파라미터를 넘겨줄 때 `:`으로 넘겨준다

```typescript
import { createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Root from './Root';
import NotFound from './screens/NotFound';
import ErrorComponent from './components/ErrorComponent';
import User from './screens/users/User';

const router = createBrowserRouter([
    {
        path: "/", // parent
        element: <Root />,
        children: [
            {
                path:"",
                element: <Home />,
                errorElement: <ErrorComponent />
            },
            {
                path:"about",
                element: <About />
            },
            {
                path: "users/:userId",
                element: <User />
            }
        ],
        errorElement: <NotFound />, 
    },

])
export default router;
```

> User.tsx

User에서 파라미터를 꺼내기 위해서 `useParams`을 사용한다.

```typescript
import { useParams } from 'react-router-dom';
import { users } from '../../db';

function User(){
    const {userId} = useParams();
    return <h1>User with it {userId} is named: {users[Number(userId)-1].name}</h1>;
}

export default User;
```

## Outlet 

Outlet은 Route의 자식들을 render 한다.

> Router.tsx

user 안에 Follower children을 추가한다.

```typescript
import Followers from './screens/users/Followers';

const router = createBrowserRouter([
    {
        path: "/", // parent
        element: <Root />,
        children: [
            ...
            {
                path: "users/:userId",
                element: <User />,
                children: [
                    {
                        path:"followers",
                        element:<Followers />
                    }
                ]
            }
        ],
        errorElement: <NotFound />, 
    },

])
export default router;
```

> User.tsx

Outlet을 통해 render 해준다.

```typescript
import { useParams, Outlet, Link } from 'react-router-dom';
import { users } from '../../db';

function User(){
    const {userId} = useParams();
    return (
        <div>
            <h1>
                User with it {userId} is named: {users[Number(userId)-1].name}
            </h1>
            <hr />
            <Link to="followers">See Followers</Link>
            <Outlet /> 
        </div>

    );
}

export default User;
```

## useOutletContext

Outlet에 `context`를 사용해서 자식컴포넌트에게 데이터를 전달할 수 있다.

> User.tsx

```typescript

function User(){
    const {userId} = useParams();
    return (
        <div>
            <h1>
                User with it {userId} is named: {users[Number(userId)-1].name}
            </h1>
            <hr />
            <Link to="followers">See Followers</Link>
            <Outlet 
                context={{
                    nameOfMyuser: users[Number(userId)-1].name,
                }}
            /> 
        </div>

    );
}
```

Followers는 Outlet에서 render 된다. **react router가 나의 route 설정을 읽고서 Outlet을 나의 URL과 매치되는 자식으로 대체시킬 것이다.**

이때, Outlet의 context를 Followers가 받기 위해서 다음과 같이 작성해야 한다.

> Followers.tsx

```typescript
import { useOutletContext } from 'react-router-dom';

interface IFollowersContex {
    nameOfMyuser:string;
}

function Followers(){
    const {nameOfMyuser} = useOutletContext<IFollowersContex>();
    console.log(nameOfMyuser);
    return <h1>Here are Followers of {nameOfMyuser}</h1>
}

export default Followers;
```

## Extras

### useSearchParams

useSearchParams 훅은 현재 위치에 대한 URL의 쿼리 문자열을 읽고 수정하는 데 사용된다. useState 훅과 마찬가지로 useSearchParams는 현재 위치의 search params와 이를 업데이트하는 데 사용할 수 있는 함수라는 두 가지 값의 배열을 반환한다.

setSearchParams 함수는 탐색과 같이 작동하지만 URL의 검색 부분에 대해서만 작동한다.

```typescript 
let [searchParams, setSearchParams] = useSearchParams();

setSearchParams(params);
```

```code
https://reactrouter.com/en/main/hooks/use-search-params?fav=yes&geo=123&something=true
```