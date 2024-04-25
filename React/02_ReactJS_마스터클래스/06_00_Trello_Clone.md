# Trello Clone

## Get Selectors

min을 작성하면 hour을 계산하는 코드를 구현해보자.

>  index.tsx

```typescript
...

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

```

> App.tsx

```typescript

import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minuteState } from './atoms';

function App() {

  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  }

  return ( 
      <div>
        <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
        <input value={hours} type="number" placeholder="Hours" readOnly />
      </div>

  );
}

export default App;

```

> atoms.tsx

```typescript
import { atom, selector } from 'recoil';

export const minuteState = atom({
    key: "minutes",
    default: 0,
})

export const hourSelector = selector({
    key:"hours",
    get: ({get}) => {
        const minutes = get(minuteState);
        return minutes / 60;
    }
})
```

## Set Selectors

hour를 작성하면 min을 계산하는 코드를 작성해보자.

> atoms.tsx

```typescript
import { atom, selector } from 'recoil';

export const minuteState = atom({
    key: "minutes",
    default: 0,
})

export const hourSelector = selector<number>({
    key:"hours",
    get: ({get}) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({set}, newValue) => {
        const minutes = Number(newValue) * 60; 
        set(minuteState, minutes);
    },
})
```

> App.tsx

```typescript
function App() {

  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  
  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event:React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return ( 
      <div>
        <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
        <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
      </div>

  );
}
```

## Drag and Drop part One

`react-beautiful-dnd`는 React로 list를 만들기 위한 아름답고 접근 가능한 드래그 앤 드롭이다.

```npm
npm i react-beautiful-dnd
npm i --save-dev @types/react-beautiful-dnd
```

### DragDropContext

DragDropContext는 기본적으로 드래그 앤 드롭을 가능하게 하고 싶은 앱의 한 부분이다.

### Droppable

Droppable는 우리가 어떤 것을 드롭할 수 있는 영역을 의미한다.

### Draggable

Draggable는 우리가 드래그할 수 있는 영역을 의미한다.

## Drag and Drop part Two

### Using innerRef

(Draggable과 Droppable컴포넌트의 내부 props정의)

`< Draggable />` 및 `< Droppable />` 컴포넌트 모두 HTMLElement를 제공해야 한다. 

이것은 DraggableProvided 및 DroppableProvided 객체의 innerRef 속성을 사용하여 수행된다.

https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md#using-innerref

### dragHandleProps

특정 영역을 통해서만 드래그를 가능하도록 하고 싶을 때 사용한다.

ex) {...provided.dragHandleProps}

### DragDropContext

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/drag-drop-context.md

### Droppable

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md

### Draggable

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/draggable.md

> App.tsx

위의 항목들을 사용 예시를 만들어보자.

```typescript
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


function App() {

  const onDragEnd = () => {}

  return ( 
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => 
              <ul ref={magic.innerRef} {...magic.droppableProps}>
              // 이 상태이면 별 이모티콘에서만 drag and drop 기능이 가능하다.
                <Draggable draggableId="first" index={0}>
                  {(magic) => 
                    <li 
                      ref={magic.innerRef}
                      {...magic.draggableProps} 
                      // {...magic.dragHandleProps}
                    >
                      <span {...magic.dragHandleProps}>⭐️</span>
                      One
                    </li>}
                </Draggable>    
                <Draggable draggableId="second" index={1}>
                  {(magic) => 
                    <li 
                      ref={magic.innerRef}
                      {...magic.draggableProps} 
                      // {...magic.dragHandleProps}
                    >
                      <span {...magic.dragHandleProps}>⭐️</span>
                      Two
                    </li>}
                </Draggable>    
              </ul>
            }
          </Droppable>
        </div>
      </DragDropContext>

  );
}

export default App;

```

## Styles and Placeholders

> App.tsx

```typescript
...

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {


  return ( 
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index} key={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  // drop and drag 할 때 Board의 사이즈를 유지 시켜준다.
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>

  );
}

export default App;

```

## Reordering

### onDragEnd

- result: DropResult
- result.draggableId: 드래그 되었던 Draggable의 id.
- result.type: 드래그 되었던 Draggable의 type.
- result.source: Draggable 이 시작된 위치(location).
- result.destination: Draggable이 끝난 위치(location). 

만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될 것 이다.

### Array.prototype.splice()

array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.

```javascript 
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months); 
// expected output: Array ["Jan", "Feb", "March", "April", "June"]
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

## Reordering part Two

**[ 방법 ]**
1) Delete item on source.index
2) Put back the item on the destination.index

### < Draggable /> list의 키
< Draggable /> list를 렌더링하는 경우 각 < Draggable />에 key prop을 추가하는 것이 중요하다.

### 규칙 : key는 list 내에서 고유해야 함.

**key에 item의 index가 포함되어서는 안된다.** (map의 index사용 X)

일반적으로 draggableId를 key로 사용하면 된다.

> [!DANGER]
> list에 key가 없으면 React가 경고하지만 index를 key로 사용하는 경우 경고하지 않는다. key를 올바르게 사용하지 않으면 정말 안 좋은 일이 생길 수 있다 💥

```typescript
return items.map((item, index) => (
< Draggable
// adding a key is important!
key={item.id}
draggableId={item.id}
index={index}
>
나머지 코드..
```

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/draggable.md#keys-for-a-list-of-draggable-


> App.tsx

구현하면 다음과 같다.

```typescript
...

function App() {

  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index
      toDosCopy.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    })
  };


  return ( 
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
                ...
                  {toDos.map((toDo, index) => (
                    // key와 draggableId는 동일해야한다.
                    <Draggable draggableId={toDo} key={toDo} index={index} >
                    ....
                    </Draggable>
                  ))}
                  ...
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>

  );
}

```



이때, drag & drop 할 때 글자가 살짝 이상해지는 걸 간헐적으로 확인할 수 있다. **왜냐하면 react는 모든 card를 다시 렌더링하고 있기 때문이다.**

## Performance

### React.memo

React.memo는 고차 컴포넌트(Higher Order Component)이다.
컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있다. 즉, **React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용한다.**

**React.memo는 props 변화에만 영향을 준다.** React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer 또는 useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링된다.
**이 메서드는 오직 성능 최적화를 위하여 사용된다.** *렌더링을 “방지”하기 위하여 사용하면 안된다. 버그를 만들 수 있다.*

DraggableCard에게 동일한 index와 동일한 todo prop을 받으면 리랜더링을 하지 않도록 하기 위함이다.

정리하자면, react memo는 **react에게 prop이 바뀌지 않는다면 component는 렌더링하지 말라고 말하는 역할을 한다.**

```typescript
function MyComponent(props) {
/* props를 사용하여 렌더링 */
}

export default React.memo(MyComponent, areEqual);
```

https://ko.reactjs.org/docs/react-api.html#reactmemo

> DraggableCard.tsx

App.tsx에서 가져와 구현한다.

```typescript
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

function DraggableCard({toDo, index}:IDraggableCardProps) {
    return (
        <Draggable draggableId={toDo} key={toDo} index={index} >
            {(magic) => (
            <Card
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
            >
                {toDo}
            </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
```

> App.tsx

```typescript
...
<Board ref={magic.innerRef} {...magic.droppableProps}>
    {toDos.map((toDo, index) => (
    <DraggableCard key={toDo} index={index} toDo={toDo}/>
    ))}
    {magic.placeholder}
</Board>
...
```

## Multi Boards 

### Object.keys(obj)

Object.keys() 메소드는 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환한다.

ex) Object.keys(obj).map((item)=>obj[item])

```javascript 
const object1 = {
a: 'somestring',
b: 42,
c: false
};
console.log(Object.keys(object1)); 
// Array ["a", "b", "c"]
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

> atom.tsx

```typescript
import { atom, selector } from 'recoil';

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do: ["a", "b"],
        doing: ["c", "d", "e"],
        done: ["f"],
    },
})
```

> Board.tsx

```typescript
...

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({toDos, boardId}:IBoardProps) {

    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
            <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} index={index} toDo={toDo}/>
                ))}
                {magic.placeholder}
            </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;
```

> App.tsx

```typescript
...
<DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
        <Boards>
        {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
        </Boards>
    </Wrapper>
</DragDropContext>
...
```

## Same Board Movement

같은 보드 내에서 이동을 구현해보자.

> App.tsx

```typescript
...

  const onDragEnd = (info:DropResult) => {

    const {destination, draggableId, source} = info;

    if(destination?.droppableId === source.droppableId){
      // same board movement
      setToDos((allBoard) => {
      const boardCopy = [...allBoard[source.droppableId]];
      boardCopy.splice(source.index, 1);
      boardCopy.splice(destination?.index, 0, draggableId);

      return {
          ...allBoard,
          [source.droppableId] : boardCopy
        };
      })

    }
    
  };

...
```

## Cross Board Movement

다른 보드끼리 이동을 구현해보자.

> App.tsx

```typescript
...

if(destination.droppableId !== source.droppableId){
    // cross board movement
    setToDos((allBoards) => {
    const sourceBoard = [...allBoards[source.droppableId]];
    const destinationBoard = [...allBoards[destination.droppableId]];
    sourceBoard.splice(source.index, 1);
    destinationBoard.splice(destination?.index, 0, draggableId);
    return {
        ...allBoards,
        [source.droppableId] : sourceBoard,
        [destination.droppableId] : destinationBoard
    };
    })
}

...
```

## Droppable Snapshot

### isDraggingOver: boolean
현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인

### draggingOverWith: ?DraggableId
Droppable 위로 드래그하는 Draggable ID

### draggingFromThisWith: ?DraggableId
현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID

### isUsingPlaceholder: boolean
placeholder가 사용되고 있는지 여부

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md#2-snapshot-droppablestatesnapshot


> Board.tsx

```typescript
...

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThisWith: boolean;
}

...

function Board({toDos, boardId}:IBoardProps) {

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                <Area 
                    isDraggingOver={info.isDraggingOver}
                    isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
                    ref={magic.innerRef} 
                    {...magic.droppableProps}
                >
                        {toDos.map((toDo, index) => (
                        <DraggableCard key={toDo} index={index} toDo={toDo} />
                        ))}
                        {magic.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
```

## Final Styles

## isDragging: boolean
Draggable이 활발하게 드래그 중이거나 드롭 애니메이션인 경우 true로 설정한다.

https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/draggable.md#2-snapshot-draggablestatesnapshot

Flatuicolors
https://flatuicolors.com/palette/us

> DraggableCard.tsx

```typescript
function DraggableCard({toDo, index}:IDraggableCardProps) {
    return (
        <Draggable draggableId={toDo} index={index} >
            {(magic, snapshot) => (
            <Card
                isDragging={snapshot.isDragging}
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
            >
                {toDo}
            </Card>
            )}
        </Draggable>
    );
}
```

## Refs

**쉽게 말해서 우리의 react 코드를 이용해 HTML 요소를 지정하고, 가져올 수 있는 방법이다.**

### useRef()

**useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환한다.** 반환된 객체는 컴포넌트의 전 life cycle을 통해 유지될 것이다.

일반적인 사용 사례는 자식에게 접근하는 경우이다.

본질적으로 useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같다.

ref 속성보다 useRef()가 더 유용합니다. 이 기능은 클래스에서 인스턴스 필드를 사용하는 방법과 유사한 어떤 가변값을 유지하는 데에 편리합니다.

```typescript
const inputEl = useRef(null);

const onButtonClick = () => {
// `current` points to the mounted text input element
inputEl.current.focus();
};

< input ref={inputEl} type="text" / >
```

https://ko.reactjs.org/docs/hooks-reference.html#useref

HTMLInputElement methods
https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#methods


> Borad.tsx

```typescript

...

function Board({toDos, boardId}:IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(() => {
            inputRef.current?.blur();
        }, 5000);
    };

    ...

    return (
        ...
        <input ref={inputRef} placeholder="grab me" />
        <button onClick={onClick}>click me</button>
        ...
    );

...
```

## Task Objects

### React Hook Form

```npm
npm install react-hook-form
```

> atoms.tsx

```typescript
import { atom, selector } from 'recoil';

export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },
})
```

> Board.tsx

```typescript
...
interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}
...
interface IForm {
    toDo: string;
}
...

function Board({toDos, boardId}:IBoardProps) {
    const {register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        
        setValue("toDo", "");
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("toDo",{required:true})} 
                    type="text" 
                    placeholder={`Add task on ${boardId}`} />
            </Form>

            ...
            <DraggableCard 
                            key={toDo.id} 
                            index={index} 
                            toDoId={toDo.id} 
                            toDoText={toDo.text} />
                        ))}
            ...
    ...
    );
}
...
```

> DragabbleCard.tsx

```typescript
...
interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}
...
function DraggableCard({toDoId,toDoText, index}:IDraggableCardProps) {
    return (
        <Draggable draggableId={toDoId + ""} index={index} >
            ...
                {toDoText}
            </Card>
            )}
        </Draggable>
    );
}

```

## Creating Tasks

> App.tsx

```typescript
if(destination.droppableId === source.droppableId){
      // same board movement
      setToDos((allBoard) => {
      const boardCopy = [...allBoard[source.droppableId]];
      const taskObj = boardCopy[source.index];
      boardCopy.splice(source.index, 1);
      boardCopy.splice(destination?.index, 0, taskObj);

      ...
    }

    if(destination.droppableId !== source.droppableId){
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        ...
      })
    }
```

> Board.tsx

```typescript
const setToDos = useSetRecoilState(toDoState);

...

const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
 setValue("toDo", "");
  };
  ...
```

## Code Challenge

1. 스타일 수정하기
2. 데이터 local storage에 저장하기
3. task 삭제 기능 추가하기 ( 클릭해서 삭제하기 | 쓰레기통 만들어서 거기에 drop하면 삭제되게 하기)
4. board의 순서 바꾸는 기능 추가하기
5. board 추가하는 기능 추가하기 

[ 추가로 구현해볼 만한 기능 ]

1. 보드가 가진 투두 전체 삭제하기
2. 보드 삭제하기
3. 작성한 투두 수정하기
4. 보드 제목 수정하기

