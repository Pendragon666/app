import axios from 'axios';
import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setUser } from 'redux/actions/userActions';

const CheckAuth = () => {
  const token = Cookie.get('P-Token');
  let user: any;

  if (!token) {
    return { authenticated: false, user };
  }
  try {
    user = decode(token);
    if (user.exp < new Date().getTime() / 1000) {
      Cookie.remove('P-Token');
      return { authenticated: false, user };
    }
    axios.defaults.headers.common['P-Token'] = token; //setting authorize token to header in axios

    // axios.interceptors.response.use(
    //   function (response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     return response;
    //   },
    //   function (error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //   },
    // );
  } catch (e) {
    return { authenticated: false, user };
  }

  return { authenticated: true, user };
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SetUser = (data: any) => dispatch(setUser(data));

  useEffect(() => {
    if (CheckAuth().authenticated) {
      SetUser(CheckAuth().user);
    }
  }, [SetUser]);

  return (
    <Route
      {...rest}
      render={(props) => (CheckAuth().authenticated ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
