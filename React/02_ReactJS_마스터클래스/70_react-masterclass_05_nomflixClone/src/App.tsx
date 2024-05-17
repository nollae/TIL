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
        <Route exact path="/tv" component={Tv}>
          {/* <Tv /> */}
        </Route>
        <Route exact path="/search" component={Search}>
          {/* <Search /> */}
        </Route>
        <Route exact component={Test}
              path={["/home", "/movies/:movieId", "/home/series", "/home/movies", "/home/latest"]}>
          {/* <Home /> */}
          {/* <Test /> */}
        </Route>
        <Route exact path="/login" component={Login}>
          {/* <Login /> */}
        </Route>
        <Route exact component={Sign}
               path={["/signup", "/signup/planform", "/signup/registration", "/signup/regform"]}>
          {/* <Sign /> */}
        </Route>
        <Route exact path="/" component={Main}>
          {/* <Main /> */}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;