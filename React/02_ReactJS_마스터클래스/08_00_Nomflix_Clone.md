# Nomflix Clone

## Introduction

🔗 프로젝트 기본 세팅 : https://github.com/nomadcoders/react-masterclass/commit/5807d31a788b59dd6fc060febb4be52d458a164d

## Header part One

## Header part Two

넷플릭스 로고 SVG : 🔗 https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg


### react-router-dom v5 vs v6

1. useRouteMatch가 useMatch로 변경
    - v5 : useRouteMatch() 사용
    ```typescript
    const homeMatch = useRouteMatch("/")
    ```
    🔗 https://v5.reactrouter.com/web/api/Hooks/useroutematch

    - v6 : useMatch()
    ```typescript
    import { Link, useMatch, PathMatch } from "react-router-dom";

    const homeMatch: PathMatch< string > | null = useMatch("/");
    ```
    🔗 https://reactrouter.com/docs/en/v6/upgrading/reach#usematch

    🔗 https://reach.tech/router/api/useMatch
2. Link에서 to는 상대경로로 <br>
    ex. '/tv' -> 'tv'
3. exact가 없어짐 <br>
    대신 알아서 최적의 경로를 react-router-dom이 판단하여 매칭해준다.

### Framer Motion repeat

🔗 https://www.framer.com/docs/transition/###repeat

#### whileHover

호버 제스처가 인식되는 동안 애니메이션할 속성 또는 variant label이다.

```typescript
< motion.div whileHover={{ scale: 1.2 }} / >
```

🔗 https://www.framer.com/docs/gestures/###whilehover

<hr/>

아래와 같이 `Link`를 설정한 후, `/tv`에 접근하더라도, 화면에 메시지(Tv.tsx 출력값)가 나오지 않오지 않는다.

이건 우리가 만든 router가 `App.tsx`에서 일치하는 부분을 찾아내서 생기는 문제이다.

**route는 항싱 `/` 부분에서 true를 반환하므로 `/` 부분은 아래로 옮겨줘야 한다.**

> Header.tsx

```typescript
...

function Header() {
  return (
    <Nav>
      <Col>
        <Items>
            <Item>
                <Link to="/">
                    Home <Circle/>
                </Link>
            </Item>
            <Item>
                <Link to="/tv">
                    Tv Shows <Circle/>
                </Link>
            </Item>
        </Items>
      </Col>
      ...
    </Nav>
  );
}

export default Header;
```

> App.tsx : 기존

```typescript
function App() {
 ...
    <Router>
        <Header />
        <Switch>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/tv">
                <Tv />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
        </Switch>
    </Router>
 ...
}
```

> App.tsx : 수정

```typescript
function App() {
 ...
    <Router>
        <Header />
        <Switch>
            <Route path="/tv">
                <Tv />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
 ...
}
```

## Header part Three

🔗 검색 아이콘 : https://fontawesome.com/icons/magnifying-glass?s=solid

## Header part Four

### useAnimation()

useAnimation 훅을 사용하여 시작 및 중지 메서드가 있는 AnimationControls을 만들 수 있다.

```typescript
const MyComponent = () => {
const controls = useAnimation()
    return < motion.div animate={controls} />
}

// 애니메이션은 controls.start 메소드로 시작할 수 있습니다.

controls.start({ x: "100%", transition: { duration: 3 }})
```

🔗 https://www.framer.com/docs/animation/#component-animation-controls

### useScroll(): ScrollMotionValues

viewport가 스크롤될 때 업데이트되는 MotionValues를 반환한다.

> [!DANGER] 
> 주의 : body 또는 html을 height: 100% 또는 이와 유사한 것으로 설정하면 페이지 길이를 정확하게 측정하는 브라우저의 기능이 손상되므로 Progress 값이 손상된다.

```typescript
export const MyComponent = () => {
const { scrollYProgress } = useViewportScroll()
return < motion.div style={{ scaleX: scrollYProgress }} />
}
```

🔗 https://www.framer.com/docs/motionvalue/###useviewportscroll

## Home Screen part One

### API 

🔗 TheMovieDB API Key : https://www.themoviedb.org/settings/api?language=ko

🔗 TheMovieDB API Document : 
https://developer.themoviedb.org/reference/movie-now-playing-list

🔗 TheMovieDB Image가져오기 : https://image.tmdb.org/t/p/original/`backdrop_path` 

🔗 BASE_PATH : https://api.themoviedb.org/3/

### React Query

```typescript

const { isLoading, error, data } = useQuery('repoData', () =>
fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
res.json()
)
)
```

🔗 https://react-query.tanstack.com/overview

## Home Screen part Two

## Slider part One

### AnimatePresence 

AnimatePresence는 컴포넌트가 render되거나 destroy 될 때 효과를 줄 수 있다.

### window size

- window.outerWidth : 브라우저 전체의 너비
- window.outerHeight : 브라우저 전체의 높이
- window.innerWidth : 브라우저 화면의 너비
- window.innerHeight : 브라우저 화면의 높이

🔗 outerWidth vs innerWidth 비교 이미지 : https://www.cluemediator.com/how-to-get-the-window-size-in-javascript

## Slider part Two 

### AnimatePresence

#### onExitComplete

exit 중인 모든 노드들이 애니메이션을 끝내면 실행된다.

> AnimatePresenceProps.onExitComplete?: (() => void) | undefined

🔗 https://www.framer.com/docs/animate-presence/###onexitcomplete

### initial
initial={false}를 전달하면 AnimatePresence는 컴포넌트가 처음 렌더링될 때 자식의 초기 애니메이션을 비활성화한다.

### slice()
slice() 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환한다. 원본 배열은 바뀌지 않는다.

🔗 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

## Box Animations part One

## Box Animations part Two

## Movie Modal

> React Router 5=>6 버전에서 변경된 점

1. useHistory() => useNavigate()

    ```typescript 
    // Home.tsx
    import { useNavigate } from "react-router-dom";

    const navigate = useNavigate();

    navigate(`/movies/${movieId}`);

    // App.tsx
    < Route path="/" element={< Home />}>
    < Route path="movies/:id" element={< Home />} />
    < /Route>
    ```

    🔗 https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory

2. useRouteMatch() => useMatch()

    ```typescript 
    import { useMatch, PathMatch } from "react-router-dom";

    const moviePathMatch: PathMatch< string> | null = useMatch("/movies/:id");
    ```

    🔗 https://reactrouter.com/docs/en/v6/upgrading/v5#replace-useroutematch-with-usematch

## Movie Modal part Two

## Movie Modal part Three

### Array.prototype.find()

find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다.
그런 요소가 없다면 undefined를 반환한다.

```javascript 
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found); // expected output: 12
```

🔗 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find

## Search Redirect

> React Router 6버전 사용시

**useHistory =>**

```typescript
const navigate: NavigateFunction = useNavigate();
navigate(`/search?keyword=${keyword}`);
```

### URLSearchParams

URL에서 특정 쿼리 문자열을 가져오거나 수정할 때 사용한다.

```javascript 
const paramsString="?keyword=%EB%A9%94%EC%9D%B4"
const searchParams = new URLSearchParams(paramsString);

searchParams.get("keyword"); // 결과: 메이
```

🔗 https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

### API URL

**TheMovieDB Search Movies**

🔗 API: https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false

🔗 https://developers.themoviedb.org/3/search/search-movies

**TheMovieDB Search TV Shows**

🔗 https://developers.themoviedb.org/3/search/search-tv-shows

## Conclusions

1. Home에 더 많은 영화 보여주기
2. TV show에 프로그램 보여주기
3. search에서 검색한 영화, Tv show 보여주기
4. BigMovie 컴포넌트 개선하기