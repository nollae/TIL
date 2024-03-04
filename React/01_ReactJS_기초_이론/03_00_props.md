# Props

## Props 란?

prpos는 일종의 방식으로, 부모 컴포넌트로 부터 자식 컴포넌트에 데이터를 보낼 수 있게 해주는 방법이다.

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
        const root = document.getElementById("root");
        function SaveBtn(){
            return <button style={{
                backgroundColor: "tomato",
                color:"white",
                padding:"10px 20px",
                border:0,
                borderRadius:10
            }}>Save Changes</button>
        }
        function ConfirmBtn(){
            return <button style={{
                backgroundColor: "tomato",
                color:"white",
                padding:"10px 20px",
                border:0,
                borderRadius:10
            }}>Confirm</button>
        }
        function App() {
            return(
                // JXS의 내부
                <div>
                    {/*함수형 컴포넌트*/}
                    <SaveBtn />
                    <ConfirmBtn />
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```

위의 코드를 보면 버튼의 명칭을 이외한 나머지 코드들은 중복된다. 따라서 Btn 컴포넌트를 생성해서 props를 이용해 명칭만 변경해주면 된다.

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
        const root = document.getElementById("root");
        function Btn(props){ // {text, big}
            return <button style={{
                backgroundColor: "tomato",
                color:"white",
                padding:"10px 20px",
                border:0,
                borderRadius:10,
                fontSize: props.big ? 18 : 10 
            }}>
                {props.text} {/*text*/}
            </button>
        }
        function App() {
            return(
                // JXS의 내부
                <div>
                    {/*함수형 컴포넌트*/}
                    <Btn text="Save Changes" big={false}/>
                    <Btn text="Continue" big={true}/>
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```

props를 통해 원하는 값을 컴포넌트에 넘겨줄 수 있으며, 이때 객체 형태로 넘어가게 된다. 따라서 props.별칭 이외에도 {별칭}으로 바로 값을 받아 컴포넌트에서 사용할 수 있다.

## Memo

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
        const root = document.getElementById("root");
        function Btn({ text, onClick }){ 
            return <button 
                onClick={onClick}
                style={{
                    backgroundColor: "tomato",
                    color:"white",
                    padding:"10px 20px",
                    border:0,
                    borderRadius:10
            }}>
                {text} 
            </button>
        }
        const MemorizedBtn = React.memo(Btn);
        function App() {
            const [value, setValue] = React.useState("Save Changes");
            const changeValue = () => setValue("Revert changes");
            return(
                <div>
                    {/*함수형 컴포넌트*/}
                    <Btn text={value} onClick={changeValue}/>
                    <Btn text="Continue" />
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```

지금 <Btn ... />에 들어가는 것들은 prop이다. 실제 EventListener 가 아니고, onClick은 prop 이름일 뿐이다. 
<br>
Btn 컴포넌트 내부에서의 onClick이 EventListner이다.

또한 여기에 style을 넣어도 반영이 안된다. 왜냐하면 prop이기 때문이다. 적용하고 싶다면 prop에서 값을 가져와 Btn 컴포넌트 내부에 적용시켜줘야 한다.

여기서 명심해야할 부분은 바로 prop안에 값을 넣었다고 자동적으로 return 안으로 들어가지않다는 사실이다. 내가 원하는 곳에 prop을 적용해줘야만 한다.

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
        const root = document.getElementById("root");
        function Btn({ text, onClick }){ 
            return <button 
                onClick={onClick}
                style={{
                    backgroundColor: "tomato",
                    color:"white",
                    padding:"10px 20px",
                    border:0,
                    borderRadius:10
            }}>
                {text} 
            </button>
        }
        const MemorizedBtn = React.memo(Btn);
        function App() {
            const [value, setValue] = React.useState("Save Changes");
            const changeValue = () => setValue("Revert changes");
            return(
                <div>
                    {/*함수형 컴포넌트*/}
                    <MemorizedBtn text={value} onClick={changeValue}/>
                    <MemorizedBtn text="Continue" />
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```

그런데 여기서 "Continue" 버튼까지 리랜더링되는 것을 알 수 있다. 이때, React Memo라고 불리는 걸 할 수 있다. 마치 memorize하는 것처럼 말이다. 즉, 우리는 리액트에게 이 컴포넌특 다시 그려지는 것을 원치 않는다고 말할 수 있다.

React.memo()를 사용하면 된다. 이는 매우 중요한 부분으로 추후에 애플리케이션이 느려지는 원인이기도 한다. 

## Prop Types

prop가 여러개 있다면 어떻게 할까? 이때 잘못된 데이터 타입으로 prop에 데이터를 넘겨준다면 어떻게 될까?

물론 에러는 나지 않지만, 우리가 하고자하는 방향성에 어긋난 데이터가 출력될 것이다. 안타깝게도 리액트에서는 이를 감지하지 못한다.

이를 방지할 수 있는 방법이 있는데 바로 `PropType`이다. PropType은 내가 어떤 타입의 prop을 받고 있는지를 체크해준다. 이때 필수적으로 하고 싶다면 isRequired를 붙여준다.

```
https://unpkg.com/prop-types@15.7.2/prop-types.js
https://unpkg.com/react@17.0.2/umd/react.development.js
```

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="root"></div>
    </body>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
    <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
        const root = document.getElementById("root");
        function Btn({ text, fontSize = 16}){ 
            return <button 
                style={{
                    backgroundColor: "tomato",
                    color:"white",
                    padding:"10px 20px",
                    border:0,
                    borderRadius:10,
                    fontSize
            }}>
                {text} 
            </button>
        }

        Btn.propTypes = {
            text: PropTypes.string,
            fontSize: PropTypes.number.isRequired,
        };

        function App() {
            return(
                <div>
                    <Btn text={555} fontSize={"18"}/>
                    <Btn text={123} />
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```


```
react.development.js:245 Warning: Failed prop type: Invalid prop `text` of type `number` supplied to `Btn`, expected `string`.
    at Btn (<anonymous>:5:19)
```
