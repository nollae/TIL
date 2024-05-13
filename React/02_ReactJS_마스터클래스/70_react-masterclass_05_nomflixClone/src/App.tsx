import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';
import Main from './Routes/Main';
import Footer from './Components/Footer';
import Login from './Routes/Login';
import Sign from './Routes/SignUp';
import Test from './Routes/Test';

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/home", "/movies/:movieId", "/home/series", "/home/movies", "/home/latest"]}>
          {/* <Home /> */}
          <Test />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path={["/signup", "/signup/planform", "/signup/registration", "/signup/regform"]}>
          <Sign />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;