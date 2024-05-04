import { Link, useHistory, useRouteMatch } from 'react-router-dom'; 

import HomeHeader from './HomeHeader';
import MainHeader from './MainHeader';
import LoginHeader from './LoginHeader';

function Header() {

    // useRouteMatch는 우리에게 이 route안에 있는지 다른곳에 있는지 알려준다.
    const mainMatch = useRouteMatch({
      path: "/",
      exact: true,
    });
    const loginMatch = useRouteMatch("/login");
    
    return (
      <>
        { mainMatch ? <MainHeader /> : loginMatch ? <> </> : <HomeHeader /> }
      </>
    );
}

export default Header;