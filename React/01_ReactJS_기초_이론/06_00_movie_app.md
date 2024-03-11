# Practice Movie App

## To Do List

state를 직접적으로 수정하지 않고 modifier function을 이용해서 state 값을 변경해준다! (절대적으로)

```javascript
import { useState } from "react";

function App() {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(toDo);
    if(toDo === ""){
      return;
    }
    setToDos(currentArray => [toDo, ...currentArray]);
    setToDo("");
    console.log(toDos);
  } 
  
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} 
              value={toDo} type="text" placeholder="Write your to do..." />
        <button>Add To Do</button>
      </form>
    </div>
  );
}

export default App;
```

여기서 기억을 해야할 것은 수정하는 함수를 사용할 때 2가지 옵션이 있다는 것을 기억해야 한다.

1. `setToDo("")` : 새롭게 데이터를 저장하기
2.  `setToDos(currentArray => [toDo, ...currentArray]);` : 기존의 데이터에 추가적인 데이터를 넣어서 저장하기 

map은 하나의 array에 있는 item을 내가 원하는 무엇이든지로 바꿔주는 역할을 하고 그건 결국 새로운 array를 return 해준다.

또한 map은 함수의 첫번째 argument로 현재의 item을 가져올 수 있다.