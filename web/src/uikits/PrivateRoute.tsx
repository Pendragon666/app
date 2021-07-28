import axios from 'axios';
import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {
  const token = Cookie.get('P-Token');
  if (!token) {
    return false;
  }

  try {
    const user: any = decode(token);
    console.info(user);
    if (user.exp < new Date().getTime() / 1000) {
      Cookie.remove('P-Token');
      return false;
    }
    axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios
  } catch (e) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={(props) => (checkAuth() ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
