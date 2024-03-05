# Effects

useState()를 사용할 때 modifier function이 작동할 때 자동적으로 리렌더링이 된다.(state가 변할 때 리렌더링이 된다.)

이때, 우리는 특정 부분만 렌더링하고 싶을 수 있다. 예를 들어 API 호출하는 부분을 렌더링에서 제외하고 싶다.

다음과 같은 방법으로 해결할 수 있다. 

## useEffect

useEffect는 두 개의 argument를 가지는 funtion 이다.

첫번째 argument는 우리가 딱 한 번만 실행하고 싶은 코드가 된다. 두번째 argument는 dependencies로, react JS 가 지켜보아야 하는 것들이다.

```javascript
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("i run all the time");
  useEffect(() => {
    console.log("CALL THE API ...");
  }, []);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me!</button>
    </div>
  );
}

export default App;
```

## Deps

나의 코드의 특정한 부분만이 변화했을 때, 원하는 코드를 실행할 수 있는 방법을 알고자 한다.

```javascript
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("i run all the time");
  useEffect(() => {
    console.log("CALL THE API ...");
  }, []);
  console.log("search for", keyword);
  return (
    <div>
      <input 
        value={keyword} 
        onChange={onChange} type="text" placeholder="Search here .. "/>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me!</button>
    </div>
  );
}

export default App;
```

위의 코드에서 counter를 실행하면 계속 search까지 리렌더링된다. 이는 원하고자 하는 방향과 어긋난다. 어떻게 해결하면 좋을까?

```javascript
useEffect(() => {
    console.log("search for", keyword);
  }, []);
```

이렇게 useEffect 코드를 실행하게 되면, 해당 부분은 딱 한번만 리렌더링된다. 그러나, search는 keyword가 입력될 때 마다 리렌더링을 해줘야 한다.

```javascript
useEffect(() => {
    console.log("search for", keyword);
  }, [keyword]);
```

배열에 keyword를 넣어주면 keyword가 입력되었을 때만 리렌더링이 된다. 이를 통해 빈 배열 []만 있었을 때 왜 한번만 렌더링이 되었는지를 알 수 있다.(즉, 지켜볼 대상이 없다는 것이다.)

```javascript
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    console.log("i run only once");
  }, []);
  useEffect(() => {
      console.log("i run when 'keyword' changes");
  }, [keyword]);
  useEffect(() => {
      console.log("i run when 'counter' changes");
  }, [counter]);
  useEffect(() => {
      console.log("i run when 'keyword & counter' changes");
  }, [keyword, counter]);
  useEffect(() => {
    if(keyword !== "" && keyword.length > 5){
      console.log("search for", keyword);
    }
  }, [keyword]);
  
  return (
    <div>
      <input 
        value={keyword} 
        onChange={onChange} type="text" placeholder="Search here .. "/>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me!</button>
    </div>
  );
}

export default App;
```

## Cleanup

showing 값에 따라 Hello()의 노출여부가 결정나는데, false 일 때, hide 되는 것이 아닌 destory가 되는 것이다.

```javascript
import { useState, useEffect } from "react";

function Hello(){
  useEffect(() => {
    console.log('created!');
    return () => console.log("destoryed!");
  },[]);
  useEffect(function(){
    console.log("hi");
    return function(){
        console.log("bye");
    };
  }, []);
  return <h1>hello</h1>;
}

function App() {

  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);

  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}> {showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
```