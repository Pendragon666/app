import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {
  const token = Cookie.get('P-Token');
  if (!token) {
    return false;
  }

  try {
    const { exp }: any = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const PublicRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={(props) => (!checkAuth() ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default PublicRoute;
