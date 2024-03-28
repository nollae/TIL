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
      <hr/>
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))} 
      </ul>
    </div>
  );
}

export default App;
```

map은 하나의 array에 있는 item을 내가 원하는 무엇이든지로 바꿔주는 역할을 하고 그건 결국 새로운 array를 return 해준다.

또한 map은 함수의 첫번째 argument로 현재의 item을 가져올 수 있다.

## Coin Tracker

```javascript
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading ... </strong> : 
      <select>
        {coins.map((coin) => (
          <option key={coin.id}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</option>
        ))}
      </select>}
    </div>
  );
}

export default App;
```

## Movie App

```javascript
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div> {loading ? 
      (<h1>Loading .... </h1>) : 
      (<div>
        { movies.map(movie => 
          (
            <div key={movie.id}>
              <img src={movie.medium_cover_image}/>
              <h2>{movie.title}</h2>
              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          
          ))
        }
        </div>
      )}
    </div>);
}

export default App;
```

React Router를 실행하기 위해서는 다음을 실행해줘야 한다.

```npm
npm install react-router-dom
```

[🔗 react-router-dom](https://reactrouter.com/en/main)

- [❗️최근 버전에서는 `Swtich` 가 아닌 `createBrowserRouter` `RouterProvider`로 변경되었다.](https://reactrouter.com/en/main/upgrading/v5#upgrade-all-switch-elements-to-routes)

- Routes는 Route을 찾는건데, Route는 여기 이 URL을 의미한다.

```npm
npm i gh-pages
```