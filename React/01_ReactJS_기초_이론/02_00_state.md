# State

## State 란?

state는 기본적으로 데이터가 저장되는 곳이다. 

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
        // not so good way 
        let counter = 0;
        function countUp(){
            counter = counter + 1;
            render();
        }
        function render(){
            ReactDOM.render(<Container />, root);
        }
        function Container() {
            return(
                <div>
                    <h3>total clicks : {counter}</h3>
                    <button onClick={countUp}>Click me</button>
                </div>
            );
        }
        render();
    </script>
</html>
```

countUp()에서 **리렌더링(render() 호출)이 되면 counter가 상승하는 것을 확인할 수 있다.** 이때 Vanilla JS와 비교를 해보자.

Vanilla JS에서는 body와 span이 업데이트되고 있는 걸 확인할 수 있다. 그러나 React JS에서는 element는 업데이트 되지 않고 **UI에서 바뀐부분만 업데이트해주고 있다.** 

이 부분은 굉장히 중요한 부분이다. React JS는 이전에 렌더링된 컴포넌트는 어떤거였는지를 확인하고 있다. 그리고 다음에 렌더링될 컴포넌트는 어떤지를 보고 **React JS는 다른 부분만 파악한다.** 

## setState 

우리가 사용자에게 업데이트된 상태를 보여주고 싶으면 새로운 정보를 가지고 컴포넌트를 리렌더링을 해줘야한다.

이때 리렌더링을 유발시키기 위해서 React JS 가진 기능을 알야아한다. 

### React.useState()

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
        // not so good way 
        function App() {
            const [counter, modifier] = React.useState(0, );

            return(
                <div>
                    <h3>total clicks : {counter}</h3>
                    <button>Click me</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
``` 

**data와 function을 순차적으로 제공하고 있다.** 이때 const [ 별칭, 별칭 ] = array 로 표현할 수 있다.

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
        // not so good way 
        function App() {
            const [counter, setCounter] = React.useState(0);
            const onClick = () => {
                setCounter(counter + 1);
            }
            return(
                <div>
                    <h3>total clicks : {counter}</h3>
                    <button onClick={onClick}>Click me</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
```

**이때 function을 실행하게 되면 자동으로 리렌더링을 도와준다.**

### State Functions

위의 예시에서 사용된 counter는 좋은 방법이 아니다. 왜냐하면 counter는 다른 곳에서 update 될 수 있기 때문이다. 즉, 우리가 원하는 counter가 아닐 수 도 있다는 것이다.

이런 현상들은 흔치 않고 자주 쓰이지는 않겠지만, state를 바꾸는 2가지 방법들이 있다.

1. setCounter를 이용해서 우리가 원하는 값을 넣어주는 것이다.
<br>
setCounter(890);
2. 이전 값을 이용해서 현재 값을 계산해 내는 것이다.
<br>
setCounter((current) => current + 1);

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
        // good way 
        function App() {
            const [counter, setCounter] = React.useState(0);
            const onClick = () => {
                // setCounter(counter + 1);
                // 위의 방법보다 아래의 방법이 더 안전하다.
                setCounter((current) => current + 1);
            }
            return(
                <div>
                    <h3>total clicks : {counter}</h3>
                    <button onClick={onClick}>Click me</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
```

## Inputs and State 

class 또는 for같은 경우, 이미 자바스크립트에서 선점해서 사용하고 있다는 걸 명심해야한다. (우리는 현재 JSX를 사용하고 있다.)

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
        // good way 
        function App() {
            const [minutes, setMinutes] = React.useState(0);
            const onChange = (event) => {
                setMinutes(event.target.value);
            }
            const reset = () => setMinutes(0);
            return(
                <div>
                    <h1 className="hi">super converter</h1>
                    <div>
                        <label htmlFor="minutes">Minutes</label>
                        <input 
                            value={minutes}
                            id="minutes" placeholder="Minutes" type="number" 
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="hours">Hours</label>
                        <input value={Math.round(minutes/60)}
                                id="hours" placeholder="Hours" type="number" 
                        />
                    </div>
                    <button onClick={reset}>Reset</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
```

## Practice (Minutes <-> Hours)

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
        // good way 
        function App() {
            const [amount, setAmount] = React.useState(0);
            const [flipped, setFlipped] = React.useState(false);
            const onChange = (event) => {
                setAmount(event.target.value);
            }
            const reset = () => setAmount(0);
            const onFlip = () => {
                reset();
                setFlipped((current) => !current)};

            return(
                <div>
                    <h1 className="hi">super converter</h1>
                    <div>
                        <label htmlFor="amount">Minutes</label>
                        <input 
                            value={flipped ? amount* 60 : amount}
                            id="amount" placeholder="Minutes" type="number" 
                            onChange={onChange}
                            disabled={flipped === true}
                        />
                    </div>

                    <div>
                        <label htmlFor="hours">Hours</label>
                        <input value={flipped ? amount : Math.round(amount/60)}
                                id="hours" placeholder="Hours" type="number" 
                                onChange={onChange}
                        disabled={flipped === false}
                        />
                    </div>
                    <button onClick={reset}>Reset</button>
                    <button onClick={onFlip}>Flip</button>
                </div>
            );
        }
        ReactDOM.render(<App />, root);
    </script>
</html>
```

## Practice (Select Options)

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

        function MinutesToHours() {
            const [amount, setAmount] = React.useState(0);
            const [flipped, setFlipped] = React.useState(false);
            
            const onChange = (event) => {
                setAmount(event.target.value);
            }
            const reset = () => setAmount(0);
            const onFlip = () => {
                reset();
                setFlipped((current) => !current);
            }

            return(
                <div>
                    <div>
                        <label htmlFor="mins">minutes</label>
                        <input value={flipped ? amount * 60 : amount} id="mins" type="number" placeholder="minutes"
                        onChange={onChange}
                        disabled={flipped}
                        />
                    </div>    
                    <div>
                        <label htmlFor="hours">hours</label>
                        <input value={flipped ? amount : amount / 60} id="hours" type="number" placeholder="hours"
                        onChange={onChange}
                        disabled={!flipped}
                        />
                    </div>   
                    <button onClick={reset}>reset</button> 
                    <button onClick={onFlip}>flip</button> 
                </div>

            );
        }

        function KmtoMiles() {
            return(
                <h3>Km 2 M</h3>
                
            );
        }

        function App() {
            const [index, setIndex] = React.useState("xx");
            const onSelect = (event) => {
                setIndex(event.target.value);
            }
            return(
                <div>
                    <h1>super converter</h1>
                    <select value={index} onChange={onSelect}>
                        <option value="xx">select your units</option>
                        <option value="0">Minuites & Hours</option>
                        <option value="1">Km & M</option>
                    </select>

                    {index === "xx" ? "select your units" : null}
                    {index === "0" ? <MinutesToHours /> : null}
                    {index === "1" ? <KmtoMiles /> : null}
                </div>

            );
        }

        ReactDOM.render(<App />, root);
    </script>
</html>
```