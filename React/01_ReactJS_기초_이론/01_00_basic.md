# The Basic Of React

## 리액트를 왜 사용할까?

왜냐하면 훨씬 더 간결하게 프로그래밍을 할 수 있기 때문이다. 아래의 예시를 보자.

### Before React

> vanilla JS 

```html
<!DOCTYPE html>
<html>
    <body>
        <span>total clicks: 0</span>
        <button id="btn">Click me!</button>  
    </body>
    <script>
        let counter  = 0;
        const button = document.getElementById("btn");
        const span = document.querySelector("span");
        function handleClick(){
            counter = counter + 1;
            span.innerText = `total clicks : ${counter}`;
        }
        button.addEventListener("click", handleClick);
    </script>
</html>
```

> React JS

CDN을 통해 `react`와 `react-dom`을 사용한다.

```
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

🔗[CDN Link](https://ko.legacy.reactjs.org/docs/cdn-links.html)

React JS는 애플리케이션이 아주 interactive하도록 만들어주는 library 이고, react-dom은 library 또는 package 인데 모든 React elemnet들을 HTML body에 들 수 있도록 해준다.

React JS는 엔진과 같다. interactive한 UI를 만들 수 있게 한다. react-dom은 React element를 HTML에 두는 역할을 하는것이다.

### React Element

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="root"></div>
    </body>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script>
        // hard way
        const root = document.getElementById("root");
        const span = React.createElement(
            "span", 
            {id:"sexy-span", style : {color: "red"}}, 
            "Hello i'm a span");
        ReactDOM.render(span, root);
    </script>
</html>
```

이 예시를 통해 알 수 있는 것은 바닐라 JS에서는 HTML을 먼저 만들고, 그걸 JavaScript로 가져와서 HTML을 수정하는 방식이었다.

하지만 React JS에서는 **모든 것이 JavaScript로써 시작해 그 다음에 HTML이 되는 것이다**. 이것이 바로 React JS 파워의 핵심이라고 할 수 있다. 

React JS는 유저에게 보여질 내용을 컨트롤할 수 있다는 것이다. 결국 위의 예시를 통해 JavaScript를 이용해 element를 생성했고, React JS가 그걸 HTML로 번역한 것을 알 수 있다.

### Events in React

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="root"></div>
    </body>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script>
        // hard way
        const root = document.getElementById("root");
        const h3 = React.createElement(
            // element
            "h3", 
            // props : id, class, stylel, event listner..
            {
                onMouseEnter: () => console.log("mouse enter")
            }, 
            // content
            "Hello i'm a h3");
        const btn = React.createElement("button", 
        {
            onClick: () => console.log("i'm clicked")
        }, 
        "Click me!");
        const container = React.createElement("div", null, [h3, btn]);
        ReactDOM.render(container, root);
    </script>
</html>
```

### JSX

`JSX`는 JavaScript를 확장한 문법이다. 기본적으로 예시에서 한 것처럼 React 요소를 만들 수 있게 해주는데, 우리가 HTML에서 사용한 문법과 흡사한 문법을 사용한다. 생긴 게 HTML과 비슷해서 JSX로 React 요소를 만드는 게 개발자들 입장에서는 굉장히 편하다.

JSX를 사용하기 위해서는 `Babel`을 사용해야 한다. Bable은 JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 바꿔준다. 

```
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

🔗[@babel/standalone](https://babeljs.io/docs/babel-standalone)

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="root"></div>
    </body>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        // simple way : JSX
        const root = document.getElementById("root");
        const Title = (
            <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
                Hello i'm a h3
            </h3>
        );
        const Button = (
            <button style={{
                backgroundColor: "tomato"}}
                onClick={() => console.log("i'm clicked")}
                >Click me</button>);

        const container = React.createElement("div", null, [Title, Button]);
        ReactDOM.render(container, root);
    </script>
</html>
```

이처럼 JSX를 사용하면 더 간결하게 element를 생성할 수 있다.

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="root"></div>
    </body>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        // simple way : JSX
        const root = document.getElementById("root");
        function Title() {
            return (
                <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
                    Hello i'm a h3
                </h3>
            );
        }
        const Button = () => (
            <button style={{
                backgroundColor: "tomato"}}
                onClick={() => console.log("i'm clicked")}
                >Click me</button>
            );

        const Container = () => (
            <div>
                <button>hello</button>
                <Title /> 
                <Button />
            </div>);
        ReactDOM.render(<Container />, root);
    </script>
</html>
```

**이때 컴포넌트의 첫 글자는 반드시 대문자여야 한다.** 만약 소문자이면 JSX와 React는 HTML 태그라고 생각하기 때문이다.