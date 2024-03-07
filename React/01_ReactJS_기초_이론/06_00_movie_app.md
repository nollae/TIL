# Practice Movie App

state를 직접적으로 수정하지 않고 modifier function을 이용해서 state 값을 변경해준다! (절대적으로)

아래는 예시코드이다.

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